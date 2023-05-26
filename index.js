const axios = require("axios");
require("dotenv").config();

// Config for the headers and the URL for the API (souce: Rapid API)
const options = {
  method: "GET",
  url: process.env.URL,
  headers: {
    "X-RapidAPI-Key": process.env.KEY,
    "X-RapidAPI-Host": process.env.HOST,
  },
};

async function fetchAndSendDieselPricesfromAPI() {
  try {
    let response = await axios.request(options);
    // The data is in the key response.data.statePrices array
    // Lets try to keep only the diesel prices and send

    let fullData = response.data.statePrices;

    // Lets filter the diesel prices only

    let dataToBeSent = fullData.map((element) => {
      let temp = { ...element, dieselPrice: element.fuel.diesel };
      //   Lets also remove the key fuel and set dieselPrice(It will look good)
      let { fuel, ...rest } = temp;

      // Did this with destructuring

      let dataFinal = { ...rest };
      return dataFinal;
    });

    // Now the data only has diesel in the fuel section

    //console.log(dataToBeSent);

    // Lets send the data to the end point
    const urlToSendData = "https://en03k0l91q0m9c.x.pipedream.net/";
    let isDataSend = await axios.post(urlToSendData, dataToBeSent);
    //console.log(isDataSend);

    // console.log("State wise Diesel Prices sent successfully.");
    return { message: "Diesel prices sent successfully." };
  } catch (error) {
    //console.error("The are some error sending the data", error);
    return { message: "Diesel prices sent successfully." };
  }
}

fetchAndSendDieselPricesfromAPI();
