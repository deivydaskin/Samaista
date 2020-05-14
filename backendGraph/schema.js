const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLInputObjectType
} = require('graphql');
const Menu = require('./models/Menu.js');
const TechCard = require('./models/TechCard.js');
const Product = require('./models/Product.js');
const Requirement = require('./models/Requirement.js');


const menuDataType = new GraphQLObjectType({
    name: 'menuData',
    fields: () => ({
        recipeNumber: { type: GraphQLString },
        name: { type: GraphQLString },
        yield: { type: GraphQLString },
        b: { type: GraphQLFloat },
        r: { type: GraphQLFloat },
        a: { type: GraphQLFloat },
        kcal: { type: GraphQLFloat }
    })
});

const MenuType = new GraphQLObjectType({
    name: 'Menu',
    fields: () => ({
        nameOfMenu: { type: GraphQLString },
        breakfastData: { type: new GraphQLList(menuDataType) },
        breakfastOverallB: { type: GraphQLFloat },
        breakfastOverallR: { type: GraphQLFloat },
        breakfastOverallA: { type: GraphQLFloat },
        breakfastOverallKcal: { type: GraphQLFloat },
        lunchData: { type: new GraphQLList(menuDataType) },
        lunchOverallB: { type: GraphQLFloat },
        lunchOverallR: { type: GraphQLFloat },
        lunchOverallA: { type: GraphQLFloat },
        lunchOverallKcal: { type: GraphQLFloat },
        dinnerData: { type: new GraphQLList(menuDataType) },
        dinnerOverallB: { type: GraphQLFloat },
        dinnerOverallR: { type: GraphQLFloat },
        dinnerOverallA: { type: GraphQLFloat },
        dinnerOverallKcal: { type: GraphQLFloat }
    })
});

const menuInputDataType = new GraphQLInputObjectType({
    name: 'MenuInputData',
    fields: () => ({
        recipeNumber: { type: GraphQLString },
        name: { type: GraphQLString },
        yield: { type: GraphQLString },
        bruto: { type: GraphQLFloat },
        neto: { type: GraphQLFloat },
        b: { type: GraphQLFloat },
        r: { type: GraphQLFloat },
        a: { type: GraphQLFloat },
        kcal: { type: GraphQLFloat }
    })
});

const techCardDataType = new GraphQLObjectType({
    name: 'techCardData',
    fields: () => ({
        number: { type: GraphQLFloat },
        code: { type: GraphQLInt },
        name: { type: GraphQLString },
        bruto: { type: GraphQLFloat },
        neto: { type: GraphQLFloat },
        b: { type: GraphQLFloat },
        r: { type: GraphQLFloat },
        a: { type: GraphQLFloat },
        kcal: { type: GraphQLFloat }
    })
});

const techCardInputDataType = new GraphQLInputObjectType({
    name: 'techCardInputData',
    fields: () => ({
        number: { type: GraphQLFloat },
        code: { type: GraphQLInt },
        name: { type: GraphQLString },
        bruto: { type: GraphQLFloat },
        neto: { type: GraphQLFloat },
        b: { type: GraphQLFloat },
        r: { type: GraphQLFloat },
        a: { type: GraphQLFloat },
        kcal: { type: GraphQLFloat }
    })
});

const TechCardType = new GraphQLObjectType({
    name: 'TechCard',
    fields: () => ({
        recipeNumber: { type: GraphQLString },
        nameOfCard: { type: GraphQLString },
        description: { type: GraphQLString },
        data: { type: new GraphQLList(techCardDataType) },
        overallB: { type: GraphQLFloat },
        overallR: { type: GraphQLFloat },
        overallA: { type: GraphQLFloat },
        overallKcal: { type: GraphQLFloat },
        yield: { type: GraphQLString }
    })
});

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        code: { type: GraphQLInt },
        nameOfProduct: { type: GraphQLString },
        bruto: { type: GraphQLFloat },
        neto: { type: GraphQLFloat },
        b: { type: GraphQLFloat },
        r: { type: GraphQLFloat },
        a: { type: GraphQLFloat },
        kcal: { type: GraphQLFloat },
        category: { type: GraphQLString }
    })
});

const RequirementType = new GraphQLObjectType({
    name: 'Requirement',
    fields: () => ({
        nameOfProduct: { type: GraphQLString },
        amount: { type: GraphQLInt },
        date: { type: GraphQLString }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Requirement: {
            type: RequirementType,
            resolve(parentValue, args) {
                return Requirement.findOne({})
            }
        },
        TechCardByName: {
            type: TechCardType,
            args: { nameOfCard: { type: GraphQLString } },
            resolve(parentValue, args) {
                return TechCard.findOne({ nameOfCard: args.nameOfCard })
            }
        },
        TechCardByRecipeNumber: {
            type: TechCardType,
            args: { recipeNumber: { type: GraphQLString } },
            resolve(parentValue, args) {
                return TechCard.findOne({ recipeNumber: args.recipeNumber })
            }
        },
        TechCards: {
            type: new GraphQLList(TechCardType),
            resolve(parentValue, args) {
                return TechCard.find({})
            }
        },
        Menus: {
            type: new GraphQLList(MenuType),
            resolve(parentValue, args) {
                return Menu.find({})
            }
        },
        MenuByName: {
            type: MenuType,
            args: { nameOfMenu: { type: GraphQLString } },
            resolve(parentValue, args) {
                return Menu.findOne({ nameOfMenu: args.nameOfMenu })
            }
        },
        Products: {
            type: new GraphQLList(ProductType),
            resolve(parentValue, args) {
                return Product.find({})
            }
        },
        ProductByCode: {
            type: ProductType,
            args: { code: { type: GraphQLString } },
            resolve(parentValue, args) {
                return Product.findOne({ code: args.code })
            }
        },
        ProductByName: {
            type: ProductType,
            args: { nameOfProduct: { type: GraphQLString } },
            resolve(parentValue, args) {
                return Product.findOne({ nameOfProduct: args.nameOfProduct })
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addRequirement: {
            type: RequirementType,
            args: {
                //GraphQLNonNull make these field required
                nameOfProduct: { type: new GraphQLNonNull(GraphQLString) },
                amount: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                let requirement = new Requirement({
                    nameOfProduct: args.nameOfProduct,
                    amount: args.amount,
                    date: Date.now()
                });
                return requirement.save();
            }
        },
        addTechCard: {
            type: TechCardType,
            args: {
                //GraphQLNonNull make these field required
                recipeNumber: { type: new GraphQLNonNull(GraphQLString) },
                nameOfCard: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                data: { type: new GraphQLList(techCardInputDataType) },
                overallB: { type: new GraphQLNonNull(GraphQLFloat) },
                overallR: { type: new GraphQLNonNull(GraphQLFloat) },
                overallA: { type: new GraphQLNonNull(GraphQLFloat) },
                overallKcal: { type: new GraphQLNonNull(GraphQLFloat) },
                yield: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let newTechCard = new TechCard({
                    recipeNumber: args.recipeNumber,
                    nameOfCard: args.nameOfCard,
                    description: args.description,
                    data: args.data,
                    overallB: args.overallB,
                    overallR: args.overallR,
                    overallA: args.overallA,
                    overallKcal: args.overallKcal,
                    yield: args.yield
                });
                return newTechCard.save();
            }
        },
        updateTechCard: {
            type: TechCardType,
            args: {
                //GraphQLNonNull make these field required
                recipeNumber: { type: new GraphQLNonNull(GraphQLString) },
                nameOfCard: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                data: { type: new GraphQLList(techCardInputDataType) },
                overallB: { type: new GraphQLNonNull(GraphQLFloat) },
                overallR: { type: new GraphQLNonNull(GraphQLFloat) },
                overallA: { type: new GraphQLNonNull(GraphQLFloat) },
                overallKcal: { type: new GraphQLNonNull(GraphQLFloat) },
                yield: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return TechCard.findOneAndUpdate(
                    { recipeNumber: args.recipeNumber },
                    {
                        $set: {
                            recipeNumber: args.recipeNumber,
                            nameOfCard: args.nameOfCard,
                            description: args.description,
                            data: args.data,
                            overallB: args.overallB,
                            overallR: args.overallR,
                            overallA: args.overallA,
                            overallKcal: args.overallKcal,
                            yield: args.yield
                        }
                    }
                )
            }
        },
        deleteTechCard: {
            type: TechCardType,
            args: {
                //GraphQLNonNull make these field required
                recipeNumber: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return TechCard.findOneAndDelete(
                    { recipeNumber: args.recipeNumber }
                )
            }
        },
        addMenu: {
            type: MenuType,
            args: {
                //GraphQLNonNull make these field required
                nameOfMenu: { type: new GraphQLNonNull(GraphQLString) },
                breakfastData: { type: new GraphQLList(menuInputDataType) },
                breakfastOverallB: { type: new GraphQLNonNull(GraphQLFloat) },
                breakfastOverallR: { type: new GraphQLNonNull(GraphQLFloat) },
                breakfastOverallA: { type: new GraphQLNonNull(GraphQLFloat) },
                breakfastOverallKcal: { type: new GraphQLNonNull(GraphQLFloat) },
                lunchData: { type: new GraphQLList(menuInputDataType) },
                lunchOverallB: { type: new GraphQLNonNull(GraphQLFloat) },
                lunchOverallR: { type: new GraphQLNonNull(GraphQLFloat) },
                lunchOverallA: { type: new GraphQLNonNull(GraphQLFloat) },
                lunchOverallKcal: { type: new GraphQLNonNull(GraphQLFloat) },
                dinnerData: { type: new GraphQLList(menuInputDataType) },
                dinnerOverallB: { type: new GraphQLNonNull(GraphQLFloat) },
                dinnerOverallR: { type: new GraphQLNonNull(GraphQLFloat) },
                dinnerOverallA: { type: new GraphQLNonNull(GraphQLFloat) },
                dinnerOverallKcal: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve(parent, args) {
                let newMenu = new Menu({
                    nameOfMenu: args.nameOfMenu,
                    breakfastData: args.breakfastData,
                    breakfastOverallB: args.breakfastOverallB,
                    breakfastOverallR: args.breakfastOverallR,
                    breakfastOverallA: args.breakfastOverallA,
                    breakfastOverallKcal: args.breakfastOverallKcal,
                    lunchData: args.lunchData,
                    lunchOverallB: args.lunchOverallB,
                    lunchOverallR: args.lunchOverallR,
                    lunchOverallA: args.lunchOverallA,
                    lunchOverallKcal: args.lunchOverallKcal,
                    dinnerData: args.dinnerData,
                    dinnerOverallB: args.dinnerOverallB,
                    dinnerOverallR: args.dinnerOverallR,
                    dinnerOverallA: args.dinnerOverallA,
                    dinnerOverallKcal: args.dinnerOverallKcal
                });
                return newMenu.save();
            }
        },
        updateMenu: {
            type: MenuType,
            args: {
                nameOfMenu: { type: new GraphQLNonNull(GraphQLString) },
                breakfastData: { type: new GraphQLList(menuInputDataType) },
                breakfastOverallB: { type: new GraphQLNonNull(GraphQLFloat) },
                breakfastOverallR: { type: new GraphQLNonNull(GraphQLFloat) },
                breakfastOverallA: { type: new GraphQLNonNull(GraphQLFloat) },
                breakfastOverallKcal: { type: new GraphQLNonNull(GraphQLFloat) },
                lunchData: { type: new GraphQLList(menuInputDataType) },
                lunchOverallB: { type: new GraphQLNonNull(GraphQLFloat) },
                lunchOverallR: { type: new GraphQLNonNull(GraphQLFloat) },
                lunchOverallA: { type: new GraphQLNonNull(GraphQLFloat) },
                lunchOverallKcal: { type: new GraphQLNonNull(GraphQLFloat) },
                dinnerData: { type: new GraphQLList(menuInputDataType) },
                dinnerOverallB: { type: new GraphQLNonNull(GraphQLFloat) },
                dinnerOverallR: { type: new GraphQLNonNull(GraphQLFloat) },
                dinnerOverallA: { type: new GraphQLNonNull(GraphQLFloat) },
                dinnerOverallKcal: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve(parent, args) {
                return Menu.findOneAndUpdate(
                    { nameOfMenu: args.nameOfMenu },
                    {
                        $set: {
                            nameOfMenu: args.nameOfMenu,
                            breakfastData: args.breakfastData,
                            breakfastOverallB: args.breakfastOverallB,
                            breakfastOverallR: args.breakfastOverallR,
                            breakfastOverallA: args.breakfastOverallA,
                            breakfastOverallKcal: args.breakfastOverallKcal,
                            lunchData: args.lunchData,
                            lunchOverallB: args.lunchOverallB,
                            lunchOverallR: args.lunchOverallR,
                            lunchOverallA: args.lunchOverallA,
                            lunchOverallKcal: args.lunchOverallKcal,
                            dinnerData: args.dinnerData,
                            dinnerOverallB: args.dinnerOverallB,
                            dinnerOverallR: args.dinnerOverallR,
                            dinnerOverallA: args.dinnerOverallA,
                            dinnerOverallKcal: args.dinnerOverallKcal
                        }
                    }
                )
            }
        },
        deleteMenu: {
            type: MenuType,
            args: {
                //GraphQLNonNull make these field required
                nameOfMenu: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return Menu.findOneAndDelete(
                    { nameOfMenu: args.nameOfMenu }
                )
            }
        },
        addProduct: {
            type: ProductType,
            args: {
                code: { type: new GraphQLNonNull(GraphQLInt) },
                nameOfProduct: { type: new GraphQLNonNull(GraphQLString) },
                bruto: { type: new GraphQLNonNull(GraphQLFloat) },
                neto: { type: new GraphQLNonNull(GraphQLFloat) },
                b: { type: new GraphQLNonNull(GraphQLFloat) },
                r: { type: new GraphQLNonNull(GraphQLFloat) },
                a: { type: new GraphQLNonNull(GraphQLFloat) },
                kcal: { type: new GraphQLNonNull(GraphQLFloat) },
                category: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let newProduct = new Product({
                    code: args.code,
                    nameOfProduct: args.nameOfProduct,
                    bruto: args.bruto,
                    neto: args.neto,
                    b: args.b,
                    r: args.r,
                    a: args.a,
                    kcal: args.kcal,
                    category: args.category
                });
                return newProduct.save();
            }
        },
        updateProduct: {
            type: ProductType,
            args: {
                code: { type: new GraphQLNonNull(GraphQLInt) },
                nameOfProduct: { type: new GraphQLNonNull(GraphQLString) },
                bruto: { type: new GraphQLNonNull(GraphQLFloat) },
                neto: { type: new GraphQLNonNull(GraphQLFloat) },
                b: { type: new GraphQLNonNull(GraphQLFloat) },
                r: { type: new GraphQLNonNull(GraphQLFloat) },
                a: { type: new GraphQLNonNull(GraphQLFloat) },
                kcal: { type: new GraphQLNonNull(GraphQLFloat) },
                category: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Product.findOneAndUpdate(
                    { code: args.code },
                    {
                        $set: {
                            code: args.code,
                            nameOfProduct: args.nameOfProduct,
                            bruto: args.bruto,
                            neto: args.neto,
                            b: args.b,
                            r: args.r,
                            a: args.a,
                            kcal: args.kcal,
                            category: args.category
                        }
                    })
            }
        },
        deleteProduct: {
            type: ProductType,
            args: {
                code: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                return Product.findOneAndDelete(
                    { code: args.code }
                )
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});