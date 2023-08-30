const fetch = require('node-fetch')
const database = require('../db/database.js');

const codes = {
    getCodes: async function getCodes(req, res){
        const query = `<REQUEST>
                  <LOGIN authenticationkey="${process.env.TRAFIKVERKET_API_KEY}" />
                  <QUERY objecttype="ReasonCode" schemaversion="1">
                        <INCLUDE>Code</INCLUDE>
                        <INCLUDE>Level1Description</INCLUDE>
                        <INCLUDE>Level2Description</INCLUDE>
                        <INCLUDE>Level3Description</INCLUDE>
                  </QUERY>
            </REQUEST>`;


            const response = fetch(
                "https://api.trafikinfo.trafikverket.se/v2/data.json", {
                    method: "POST",
                    body: query,
                    headers: { "Content-Type": "text/xml" }
                }
            ).then(function(response) {
                return response.json()
            }).then(function(result) {
                return res.json({
                    data: result.RESPONSE.RESULT[0].ReasonCode
                });
            })
    }
};

module.exports = codes;
