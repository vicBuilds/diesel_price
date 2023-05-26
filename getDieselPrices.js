const axios = require("axios");

const options = {
  method: "GET",
  url: "https://daily-petrol-diesel-lpg-cng-fuel-prices-in-india.p.rapidapi.com/v1/fuel-prices/today/india/states",
  headers: {
    "X-RapidAPI-Key": "34c3ef81b4msh4299617d854dc7bp10d4abjsn880b1f97eee6",
    "X-RapidAPI-Host":
      "daily-petrol-diesel-lpg-cng-fuel-prices-in-india.p.rapidapi.com",
  },
};

async function fetchAndSendDieselPricesfromAPI() {
  try {
    let response = await axios.request(options);
    // The data is in key response.data.statePrices array
    // Lets try to keep only the diesel prices and send

    let fullData = response.data.statePrices;

    // Lets filter the diesel only

    let dataToBeSent = fullData.map((element) => {
      let temp = { ...element, dieselPrice: element.fuel.diesel };
      //   Lets also remove the key fuel and set dieselPrice(It will look good)
      let { fuel, ...rest } = temp;
      let dataFinal = { ...rest };
      return dataFinal;
    });

    // Now the data only has diesel in the fuel section

    //console.log(dataToBeSent);

    // Lets send the data to the end point
    const urlToSendData = "https://en03k0l91q0m9c.x.pipedream.net/";
    let isDataSend = await axios.post(urlToSendData, dataToBeSent);
    console.log(isDataSend);
    console.log("State wise Diesel Prices sent successfully.");
  } catch (error) {
    console.error("The are some error sending the data", error);
  }
}

fetchAndSendDieselPricesfromAPI();
