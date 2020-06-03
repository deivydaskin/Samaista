import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import axios from 'axios';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default async function DayMenuPDF(nameOfMenu, nameOfMenu2, getTokenSilently, lopselisState, darzelisState, darbuotojaiState) {
    const token = await getTokenSilently();
    var docDefinition;

    axios({
        url: 'https://samaista.herokuapp.com/graphql',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            query: `
        query{
            MenuByName(nameOfMenu: "${nameOfMenu}") {
                nameOfMenu
                breakfastData{
                  recipeNumber
                        name
                  yield
                  b
                  r
                  a
                  kcal
                }
                breakfastOverallB
                breakfastOverallR
                breakfastOverallA
                breakfastOverallKcal
                lunchData{
                  recipeNumber
                        name
                  yield
                  b
                  r
                  a
                  kcal
                }
                lunchOverallB
                lunchOverallR
                lunchOverallA
                lunchOverallKcal
                dinnerData{
                  recipeNumber
                        name
                  yield
                  b
                  r
                  a
                  kcal
                }
                dinnerOverallB
                dinnerOverallR
                dinnerOverallA
                dinnerOverallKcal
              } 
        }
        `
        }
    })
        .then(async (response) => {
            console.log(response);

            let newBreakfastArr = {
                nameOfMenu: "",
                breakfastData: [],
                breakfastOverallB: 0,
                breakfastOverallR: 0,
                breakfastOverallA: 0,
                breakfastOverallKcal: 0
            };
            newBreakfastArr.nameOfMenu = response.data.data.MenuByName.nameOfMenu;
            newBreakfastArr.breakfastOverallB = response.data.data.MenuByName.breakfastOverallB;
            newBreakfastArr.breakfastOverallR = response.data.data.MenuByName.breakfastOverallR;
            newBreakfastArr.breakfastOverallA = response.data.data.MenuByName.breakfastOverallA;
            newBreakfastArr.breakfastOverallKcal = response.data.data.MenuByName.breakfastOverallKcal;
            for (let i = 0; i < response.data.data.MenuByName.breakfastData.length; i++) {
                newBreakfastArr.breakfastData.push({
                    name: "",
                    yield: '',
                    b: null,
                    r: null,
                    a: null,
                    kcal: null
                })
                newBreakfastArr.breakfastData[i].recipeNumber = response.data.data.MenuByName.breakfastData[i].recipeNumber;
                newBreakfastArr.breakfastData[i].name = response.data.data.MenuByName.breakfastData[i].name;
                newBreakfastArr.breakfastData[i].b = response.data.data.MenuByName.breakfastData[i].b;
                newBreakfastArr.breakfastData[i].r = response.data.data.MenuByName.breakfastData[i].r;
                newBreakfastArr.breakfastData[i].a = response.data.data.MenuByName.breakfastData[i].a;
                newBreakfastArr.breakfastData[i].kcal = response.data.data.MenuByName.breakfastData[i].kcal;
                newBreakfastArr.breakfastData[i].yield = response.data.data.MenuByName.breakfastData[i].yield;
            };

            let newLunchArr = {
                lunchData: [],
                lunchOverallB: 0,
                lunchOverallR: 0,
                lunchOverallA: 0,
                lunchOverallKcal: 0
            };
            newLunchArr.lunchOverallB = response.data.data.MenuByName.lunchOverallB;
            newLunchArr.lunchOverallR = response.data.data.MenuByName.lunchOverallR;
            newLunchArr.lunchOverallA = response.data.data.MenuByName.lunchOverallA;
            newLunchArr.lunchOverallKcal = response.data.data.MenuByName.lunchOverallKcal;
            for (let i = 0; i < response.data.data.MenuByName.lunchData.length; i++) {
                newLunchArr.lunchData.push({
                    name: "",
                    yield: '',
                    b: null,
                    r: null,
                    a: null,
                    kcal: null
                })
                newLunchArr.lunchData[i].recipeNumber = response.data.data.MenuByName.lunchData[i].recipeNumber;
                newLunchArr.lunchData[i].name = response.data.data.MenuByName.lunchData[i].name;
                newLunchArr.lunchData[i].b = response.data.data.MenuByName.lunchData[i].b;
                newLunchArr.lunchData[i].r = response.data.data.MenuByName.lunchData[i].r;
                newLunchArr.lunchData[i].a = response.data.data.MenuByName.lunchData[i].a;
                newLunchArr.lunchData[i].kcal = response.data.data.MenuByName.lunchData[i].kcal;
                newLunchArr.lunchData[i].yield = response.data.data.MenuByName.lunchData[i].yield;
            };

            let newDinnerArr = {
                dinnerData: [],
                dinnerOverallB: 0,
                dinnerOverallR: 0,
                dinnerOverallA: 0,
                dinnerOverallKcal: 0
            };
            newDinnerArr.dinnerOverallB = response.data.data.MenuByName.dinnerOverallB;
            newDinnerArr.dinnerOverallR = response.data.data.MenuByName.dinnerOverallR;
            newDinnerArr.dinnerOverallA = response.data.data.MenuByName.dinnerOverallA;
            newDinnerArr.dinnerOverallKcal = response.data.data.MenuByName.dinnerOverallKcal;
            for (let i = 0; i < response.data.data.MenuByName.dinnerData.length; i++) {
                newDinnerArr.dinnerData.push({
                    name: "",
                    yield: '',
                    b: null,
                    r: null,
                    a: null,
                    kcal: null
                })
                newDinnerArr.dinnerData[i].recipeNumber = response.data.data.MenuByName.dinnerData[i].recipeNumber;
                newDinnerArr.dinnerData[i].name = response.data.data.MenuByName.dinnerData[i].name;
                newDinnerArr.dinnerData[i].b = response.data.data.MenuByName.dinnerData[i].b;
                newDinnerArr.dinnerData[i].r = response.data.data.MenuByName.dinnerData[i].r;
                newDinnerArr.dinnerData[i].a = response.data.data.MenuByName.dinnerData[i].a;
                newDinnerArr.dinnerData[i].kcal = response.data.data.MenuByName.dinnerData[i].kcal;
                newDinnerArr.dinnerData[i].yield = response.data.data.MenuByName.dinnerData[i].yield;
            };

            var body1 = [];
            body1.push([{}, { text: 'Lopšelis', alignment: 'center' }, { text: 'Darželis', alignment: 'center' }, { text: 'Darbuotojai', alignment: 'center' }]);
            body1.push([{ text: 'Žmonių skaičius', alignment: 'right' }, { text: lopselisState.count, alignment: 'center' }, { text: darzelisState.count, alignment: 'center' }, { text: darbuotojaiState.count, alignment: 'center' }]);
            body1.push([{ text: 'Dienos planinė vertė', alignment: 'right' }, { text: lopselisState.cost, alignment: 'center' }, { text: darzelisState.cost, alignment: 'center' }, { text: darbuotojaiState.cost, alignment: 'center' }]);
            body1.push([{ text: 'Suma', alignment: 'right' }, { text: lopselisState.sum.toFixed(2), alignment: 'center' }, { text: darzelisState.sum.toFixed(2), alignment: 'center' }, { text: darbuotojaiState.sum.toFixed(2), alignment: 'center' }]);
            function table1() {
                return {
                    table: {
                        headerRows: 1,
                        widths: ['auto', 'auto', 'auto', 'auto'],
                        body: body1
                    }
                };
            }

            var body2 = [];
            let temp1 = [];
            temp1.push({ text: 'Produktų pavadinimas', alignment: 'center', rowSpan: 2 }, { text: 'Pusryčiai', alignment: 'center', colSpan: newBreakfastArr.breakfastData.length });
            for (let i = 1; i < newBreakfastArr.breakfastData.length; i++) {
                temp1.push({});
            }
            temp1.push({ text: 'Pietūs', alignment: 'center', colSpan: newLunchArr.lunchData.length });
            for (let i = 1; i < newLunchArr.lunchData.length; i++) {
                temp1.push({});
            }
            temp1.push({ text: 'Vakarienė', alignment: 'center', colSpan: newDinnerArr.dinnerData.length });
            for (let i = 1; i < newDinnerArr.dinnerData.length; i++) {
                temp1.push({});
            }
            temp1.push({ text: 'Kiekis viso', alignment: 'center', rowSpan: 2 }, { text: 'Atiduota viso', alignment: 'center', rowSpan: 2 });
            body2.push(temp1);

            temp1 = [];
            temp1.push({});
            let breakFastCount = 0;
            for (let i = 0; i < newBreakfastArr.breakfastData.length; i++) {
                temp1.push({ text: newBreakfastArr.breakfastData[i].name, alignment: 'center' })
                breakFastCount++;
            }
            let lunchCount = 0;
            for (let i = 0; i < newLunchArr.lunchData.length; i++) {
                temp1.push({ text: newLunchArr.lunchData[i].name, alignment: 'center' });
                lunchCount++;
            }
            let dinnerCount = 0;
            for (let i = 0; i < newDinnerArr.dinnerData.length; i++) {
                temp1.push({ text: newDinnerArr.dinnerData[i].name, alignment: 'center' });
                dinnerCount++;
            }
            temp1.push({}, {});
            body2.push(temp1);

            var breakfastProducts = [];
            for (let i = 0; i < newBreakfastArr.breakfastData.length; i++) {

                let response = await getProducts(newBreakfastArr.breakfastData[i].recipeNumber, token);
                for (let j = 0; j < response.data.data.TechCardByRecipeNumber.data.length; j++) {
                    let returnObj = { name: '', bruto: 0, nameOfCard: '' };
                    returnObj.name = response.data.data.TechCardByRecipeNumber.data[j].name;
                    returnObj.bruto = response.data.data.TechCardByRecipeNumber.data[j].bruto;
                    returnObj.nameOfCard = response.data.data.TechCardByRecipeNumber.nameOfCard;
                    breakfastProducts.push(returnObj);
                }

            }
            var lunchProducts = [];
            for (let i = 0; i < newLunchArr.lunchData.length; i++) {
                let response = await getProducts(newLunchArr.lunchData[i].recipeNumber, token);
                for (let j = 0; j < response.data.data.TechCardByRecipeNumber.data.length; j++) {
                    let returnObj = { name: '', bruto: 0, nameOfCard: '' };
                    returnObj.name = response.data.data.TechCardByRecipeNumber.data[j].name;
                    returnObj.bruto = response.data.data.TechCardByRecipeNumber.data[j].bruto;
                    returnObj.nameOfCard = response.data.data.TechCardByRecipeNumber.nameOfCard;
                    lunchProducts.push(returnObj);
                }
            }
            var dinnerProducts = [];
            for (let i = 0; i < newDinnerArr.dinnerData.length; i++) {

                let response = await getProducts(newDinnerArr.dinnerData[i].recipeNumber, token);
                for (let j = 0; j < response.data.data.TechCardByRecipeNumber.data.length; j++) {
                    let returnObj = { name: '', bruto: 0, nameOfCard: '' };
                    returnObj.name = response.data.data.TechCardByRecipeNumber.data[j].name;
                    returnObj.bruto = response.data.data.TechCardByRecipeNumber.data[j].bruto;
                    returnObj.nameOfCard = response.data.data.TechCardByRecipeNumber.nameOfCard;
                    dinnerProducts.push(returnObj);
                }

            }
            var concatedArr = breakfastProducts.concat(lunchProducts.concat(dinnerProducts));

            let filteredArr = concatedArr.filter((elem, index, self) => self.findIndex(
                (t) => { return (t.name === elem.name) }) === index)
            var temp2 = [];
            var temp2 = [];
            var body3 = [];
            var toDataBase = [];
            console.log(filteredArr);
            for (let i = 0; i < filteredArr.length; i++) {
                temp2 = [];
                let kiekisViso = 0;
                let breakFastCountTemp = breakFastCount;
                let lunchCountTemp = lunchCount;
                let dinnerCountTemp = dinnerCount;
                for (let j = 0; j < temp1.length; j++) {
                    //console.log(temp1[j].text + " | " + filteredArr[i].nameOfCard);
                    if (temp1[j].text) {
                        let empty = true;
                        let test = 0;
                        for (let k = 0; k < concatedArr.length; k++) {
                            if (temp1[j].text === concatedArr[k].nameOfCard && concatedArr[k].name === filteredArr[i].name) {
                                test += concatedArr[k].bruto;
                                empty = false;
                            }
                        }
                        if (empty) {
                            temp2.push({});
                        } else {
                            temp2.push({ text: test + "g." });
                            if (breakFastCountTemp > 0) {
                                kiekisViso += ((parseInt(lopselisState.count) + parseInt(darzelisState.count)) * parseInt(test));
                                breakFastCountTemp = breakFastCountTemp - 1;
                            } else if (breakFastCountTemp <= 0) {
                                kiekisViso += ((parseInt(lopselisState.count) + parseInt(darzelisState.count) + parseInt(darbuotojaiState.count)) * parseInt(test));
                                lunchCountTemp = lunchCountTemp - 1;
                            } else if (breakFastCountTemp <= 0) {
                                kiekisViso += ((parseInt(lopselisState.count) + parseInt(darzelisState.count)) * parseInt(test));
                                dinnerCountTemp = dinnerCountTemp - 1;
                            }
                        };
                        // if (breakFastCountTemp > 0 && temp1[j].text === filteredArr[i].nameOfCard) {
                        //     kiekisViso += ((parseInt(lopselisState.count) + parseInt(darzelisState.count)) * parseInt(filteredArr[i].bruto));
                        //     breakFastCountTemp = breakFastCountTemp - 1;
                        // } else if (breakFastCountTemp <= 0 && lunchCountTemp > 0 && temp1[j].text === filteredArr[i].nameOfCard) {
                        //     kiekisViso += ((parseInt(lopselisState.count) + parseInt(darzelisState.count) + parseInt(darbuotojaiState.count)) * parseInt(filteredArr[i].bruto));
                        //     lunchCountTemp = lunchCountTemp - 1;
                        // } else if (breakFastCountTemp <= 0 && lunchCountTemp <= 0 && dinnerCountTemp > 0 && temp1[j].text === filteredArr[i].nameOfCard) {
                        //     kiekisViso += ((parseInt(lopselisState.count) + parseInt(darzelisState.count)) * parseInt(filteredArr[i].bruto));
                        //     dinnerCountTemp = dinnerCountTemp - 1;
                        // }


                    } else if (j === 0) {
                        temp2.push({ text: filteredArr[i].name });

                    } else if (j === (temp1.length - 2)) {
                        temp2.push({ text: kiekisViso / 1000 + " kg." });
                        toDataBase.push({ nameOfProduct: filteredArr[i].name, amount: kiekisViso })
                    } else {
                        temp2.push({});
                    }


                }
                // temp2.push({ text: kiekisViso });
                // temp2.push({});
                body2.push(temp2);
            }
            console.log(toDataBase);
            handlePost(toDataBase, token);

            function table2() {
                return {
                    table: {
                        headerRows: 2,
                        width: ['auto'],
                        body: body2
                    }
                };
            }
            docDefinition = {
                pageSize: 'A3',
                pageOrientation: 'landscape',
                content: [
                    { text: 'Direktorė __________________ ___________ \n (parašas)', style: 'nameOfCEO' },
                    { text: 'VALGIARAŠTIS (REIKALAVIMAS) Nr. __ \n maisto produktams išduoti \n\n 202_m. _________ mėn. ___ d.', style: 'name' },
                    table1(),
                    { text: '\n' },
                    table2()
                ],

                styles: {
                    nameOfCEO: {
                        alignment: 'right'
                    },
                    name: {
                        alignment: 'center'
                    },
                    header: {
                        fontSize: 14,
                        alignment: 'center'
                    },
                    subheader: {
                        fontSize: 14,
                        bold: true,
                        alignment: 'center'
                    },
                    table: {
                        alignment: 'center'
                    }
                },
            };
            pdfMake.createPdf(docDefinition).download("Reikalavimas_" + nameOfMenu);

        })
        .catch((error) => {
            console.log(error);
        });
}

function handlePost(data, token) {
    console.log(JSON.stringify(data));
    let Quoted = JSON.stringify(data);
    const Unquoted = Quoted.replace(/"([^"]+)":/g, '$1:')
    axios({
        url: 'https://samaista.herokuapp.com/graphql',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            query: `
            mutation{
                addRequirement(products: ${Unquoted}) {
                    products {
                        nameOfProduct
                        amount
                    }
                }
            }
            `
        }
    })
        .then((response) => {
            console.log(response);

        })
        .catch((error) => {
            console.log(error);
        });
}


async function getProducts(recipeNumber, token) {
    //let returnObj = { name: '', bruto: 0, nameOfCard: '' };
    return axios({
        url: 'https://samaista.herokuapp.com/graphql',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            query: `
            query{
                TechCardByRecipeNumber(recipeNumber: "${recipeNumber}") {
                    recipeNumber
                    nameOfCard
                    data {
                        name
                        bruto
                    }
                }
            }
            `
        }
    })
    // .then((response) => {
    //     // for (let i = 0; i < response.data.data.TechCardByRecipeNumber.data.length; i++) {
    //     //     returnObj.name = response.data.data.TechCardByRecipeNumber.data[i].name;
    //     //     returnObj.bruto = response.data.data.TechCardByRecipeNumber.data[i].bruto;
    //     //     returnObj.nameOfCard = response.data.data.TechCardByRecipeNumber.nameOfCard
    //     // }

    // })
    // .catch((error) => {
    //     console.log(error);
    // });
}

async function getMenu(nameOfMenu2, token) {
    return axios({
        url: 'https://samaista.herokuapp.com/graphql',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            query: `
        query{
            MenuByName(nameOfMenu: "${nameOfMenu2}") {
                nameOfMenu
                breakfastData{
                  recipeNumber
                        name
                  yield
                  b
                  r
                  a
                  kcal
                }
                breakfastOverallB
                breakfastOverallR
                breakfastOverallA
                breakfastOverallKcal
                lunchData{
                  recipeNumber
                        name
                  yield
                  b
                  r
                  a
                  kcal
                }
                lunchOverallB
                lunchOverallR
                lunchOverallA
                lunchOverallKcal
                dinnerData{
                  recipeNumber
                        name
                  yield
                  b
                  r
                  a
                  kcal
                }
                dinnerOverallB
                dinnerOverallR
                dinnerOverallA
                dinnerOverallKcal
              } 
        }
        `
        }
    });
}