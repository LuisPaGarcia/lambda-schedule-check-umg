const axios = require("axios");
const getUrl = require("./getUrl");
const guidesObj = {
  ale: "1W211083535",
  mochy: "1W211084034",
};
async function verifyGuides() {
  try {
    const responses = await Promise.all(
      Object.keys(guidesObj).map((guide) => axios.get(getUrl(guidesObj[guide])))
    );

    responses.map((response) => {
      const { datosGuia } = response.data.tracking;
      const status = datosGuia.PODStatusDes;
      const nombre = datosGuia.DestinatarioNombre;
      const numeroGuia = datosGuia.NumeroGuia;
      console.log(nombre, " - ", numeroGuia, " - ", status);
    });
  } catch (error) {
    console.log(error);
  }
}
verifyGuides();

module.exports = verifyGuides;
