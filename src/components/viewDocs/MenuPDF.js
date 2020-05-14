import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import axios from 'axios';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default async function createMenuPDF(nameOfMenu, getTokenSilently) {
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
        .then((response) => {
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
            body1.push([{ text: 'Patiekalo pavadinimas', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] }, { text: 'Receptūros nr.', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] }, { text: 'Išeiga', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] }, { text: 'Patiekalo maistinė vertė, g', colSpan: 3, alignment: 'center' }, {}, {}, { text: 'Energinė vertė, kcal', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] }]);
            body1.push([{}, {}, {}, { text: 'R(g)' }, { text: 'A(g)' }, { text: 'Kcal(g)' }, {}]);
            for (let i = 0; i < newBreakfastArr.breakfastData.length; i++) {
                let rows = [];
                rows.push(newBreakfastArr.breakfastData[i].name.toString());
                rows.push(newBreakfastArr.breakfastData[i].recipeNumber);
                rows.push(newBreakfastArr.breakfastData[i].yield);
                rows.push(newBreakfastArr.breakfastData[i].b);
                rows.push(newBreakfastArr.breakfastData[i].r);
                rows.push(newBreakfastArr.breakfastData[i].a);
                rows.push(newBreakfastArr.breakfastData[i].kcal);
                body1.push(rows);
            }
            body1.push([{ text: 'Iš viso:', colSpan: 3, alignment: 'right' }, {}, {}, { text: newBreakfastArr.breakfastOverallB }, { text: newBreakfastArr.breakfastOverallR }, { text: newBreakfastArr.breakfastOverallA }, { text: newBreakfastArr.breakfastOverallKcal }]);

            var body2 = [];
            body2.push([{ text: 'Patiekalo pavadinimas', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] }, { text: 'Receptūros nr.', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] }, { text: 'Išeiga', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] }, { text: 'Patiekalo maistinė vertė, g', colSpan: 3, alignment: 'center' }, {}, {}, { text: 'Energinė vertė, kcal', alignment: 'center', margin: [0, 8, 0, 0] }]);
            body2.push([{}, {}, {}, { text: 'R(g)' }, { text: 'A(g)' }, { text: 'Kcal(g)' }, {}]);
            for (let i = 0; i < newLunchArr.lunchData.length; i++) {
                let rows = [];
                rows.push(newLunchArr.lunchData[i].name.toString());
                rows.push(newLunchArr.lunchData[i].recipeNumber);
                rows.push(newLunchArr.lunchData[i].yield);
                rows.push(newLunchArr.lunchData[i].b);
                rows.push(newLunchArr.lunchData[i].r);
                rows.push(newLunchArr.lunchData[i].a);
                rows.push(newLunchArr.lunchData[i].kcal);

                body2.push(rows);
            }
            body2.push([{ text: 'Iš viso:', colSpan: 3, alignment: 'right' }, {}, {}, { text: newLunchArr.lunchOverallB }, { text: newLunchArr.lunchOverallR }, { text: newLunchArr.lunchOverallA }, { text: newLunchArr.lunchOverallKcal }]);

            var body3 = [];
            body3.push([{ text: 'Patiekalo pavadinimas', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] }, { text: 'Receptūros nr.', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] }, { text: 'Išeiga', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] }, { text: 'Patiekalo maistinė vertė, g', colSpan: 3, alignment: 'center' }, {}, {}, { text: 'Energinė vertė, kcal', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] }]);
            body3.push([{}, {}, {}, { text: 'R(g)' }, { text: 'A(g)' }, { text: 'Kcal(g)' }, {}]);
            for (let i = 0; i < newDinnerArr.dinnerData.length; i++) {
                let rows = [];
                rows.push(newDinnerArr.dinnerData[i].name.toString());
                rows.push(newDinnerArr.dinnerData[i].recipeNumber);
                rows.push(newDinnerArr.dinnerData[i].yield);
                rows.push(newDinnerArr.dinnerData[i].b);
                rows.push(newDinnerArr.dinnerData[i].r);
                rows.push(newDinnerArr.dinnerData[i].a);
                rows.push(newDinnerArr.dinnerData[i].kcal);

                body3.push(rows);
            }
            body3.push([{ text: 'Iš viso:', colSpan: 3, alignment: 'right' }, {}, {}, { text: newDinnerArr.dinnerOverallB }, { text: newDinnerArr.dinnerOverallR }, { text: newDinnerArr.dinnerOverallA }, { text: newDinnerArr.dinnerOverallKcal }]);

            function table1() {
                return {
                    table: {
                        headerRows: 2,
                        width: ['auto'],
                        body: body1
                    }
                };
            }
            function table2() {
                return {
                    table: {
                        headerRows: 2,
                        width: ['auto'],
                        body: body2
                    }
                };
            }
            function table3() {
                return {
                    table: {
                        headerRows: 2,
                        width: ['auto'],
                        body: body3
                    }
                };
            }
            docDefinition = {
                content: [
                    { text: 'L/d „Spragtukas“ direktorė\n Ana Švedovič\n\n ..................\n (parašas)', style: 'nameOfCEO' },
                    { text: '\n' },
                    { text: '\n' },
                    { text: 'VALGIARAŠTIS', style: 'header' },
                    { text: newBreakfastArr.nameOfMenu, style: 'subheader' },
                    { text: '\n' },
                    { text: 'Pusryčiai', style: 'subheader' },
                    table1(),
                    { text: '\n' },
                    { text: 'Pietūs', style: 'subheader' },
                    table2(),
                    { text: '\n' },
                    { text: 'Vakarienė', style: 'subheader' },
                    table3(),
                ],

                styles: {
                    nameOfCEO: {
                        alignment: 'right'
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
            pdfMake.createPdf(docDefinition).download(newBreakfastArr.nameOfMenu.toString());
        })
        .catch((error) => {
            console.log(error);
        });
}