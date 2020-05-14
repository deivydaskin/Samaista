import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import axios from 'axios';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default async function createPDF(recipeNumber, getTokenSilently) {
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
                TechCardByRecipeNumber(recipeNumber: "${recipeNumber}") {
                    recipeNumber
                    nameOfCard
                    description
                    data {
                        number
                        code
                        name
                        bruto
                        neto
                        b
                        r
                        a
                        kcal
                    }
                    overallB
                    overallR
                    overallA
                    overallKcal
                    yield
                }
            }
            `
        }
    })
        .then((response) => {
            console.log(response.data.data.TechCardByRecipeNumber);
            let yield1 = response.data.data.TechCardByRecipeNumber.yield;
            let overA = response.data.data.TechCardByRecipeNumber.overallA;
            let overB = response.data.data.TechCardByRecipeNumber.overallB;
            let overR = response.data.data.TechCardByRecipeNumber.overallR;
            let overKcal = response.data.data.TechCardByRecipeNumber.overallKcal;
            let description = response.data.data.TechCardByRecipeNumber.description;

            var body = [];
            body.push([{ text: 'Eil. Nr.', rowSpan: 2 }, { text: 'Maisto produkto pavadinimas', rowSpan: 2, alignment: 'center', margin: [0, 8, 0, 0] }, { text: 'Masė, g.', colSpan: 2, alignment: 'center' }, {}, { text: 'Maistinė ir energinė vertė', colSpan: 4, alignment: 'center' }, {}, {}, {}]);
            body.push([{}, {}, { text: 'Bruto' }, { text: 'Neto' }, { text: 'B(g)' }, { text: 'R(g)' }, { text: 'A(g)' }, { text: 'Kcal(g)' }]);
            for (let i = 0; i < response.data.data.TechCardByRecipeNumber.data.length; i++) {
                let rows = [];
                rows.push(response.data.data.TechCardByRecipeNumber.data[i].number);
                rows.push(response.data.data.TechCardByRecipeNumber.data[i].name.toString());
                rows.push(response.data.data.TechCardByRecipeNumber.data[i].bruto);
                rows.push(response.data.data.TechCardByRecipeNumber.data[i].neto);
                rows.push(response.data.data.TechCardByRecipeNumber.data[i].b);
                rows.push(response.data.data.TechCardByRecipeNumber.data[i].r);
                rows.push(response.data.data.TechCardByRecipeNumber.data[i].a);
                rows.push(response.data.data.TechCardByRecipeNumber.data[i].kcal);
                body.push(rows);
            }
            body.push([{ text: 'Išeiga:', colSpan: 2, alignment: 'right' }, {}, { text: yield1, colSpan: 2, alignment: 'center' }, {}, { text: '-' }, { text: '-' }, { text: '-' }, { text: '-' }]);
            body.push([{ text: 'Patiekalo maistinė ir energinė vertė:', colSpan: 4, alignment: 'right' }, {}, {}, {}, { text: overB }, { text: overR }, { text: overA }, { text: overKcal }]);
            console.log(body);

            function table() {
                return {
                    table: {
                        headerRows: 2,
                        widths: ['auto', 200, '*', '*', '*', '*', '*', '*',],
                        body: body
                    }
                };
            }

            docDefinition = {
                content: [
                    { text: 'L/d „Spragtukas“ direktorė\n Ana Švedovič\n\n ..................\n (parašas)', style: 'nameOfCEO' },
                    { text: '\n' },
                    { text: '\n' },
                    { text: 'PATIEKALO TECHNOLOGINĖ KORTELĖ', style: 'header' },
                    { text: response.data.data.TechCardByRecipeNumber.nameOfCard, style: 'subheader' },
                    { text: '\n' },
                    { text: response.data.data.TechCardByRecipeNumber.recipeNumber, style: 'recNum' },
                    table(),
                    { text: '\n' },
                    { text: 'Technologinis aprašymas', style: 'subheader' },
                    { text: '\n' },
                    { text: description, style: 'recNum' },
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
            pdfMake.createPdf(docDefinition).download(response.data.data.TechCardByRecipeNumber.nameOfCard.toString());
        })
        .catch((error) => {
            console.log(error);
        });


}