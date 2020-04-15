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

const menuDataType = new GraphQLObjectType({
    name: 'menuData',
    fields: () => ({
        number: { type: GraphQLFloat },
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
        data: { type: new GraphQLList(menuDataType) },
        overallB: { type: GraphQLFloat },
        overallR: { type: GraphQLFloat },
        overallA: { type: GraphQLFloat },
        overallKcal: { type: GraphQLFloat },
    })
});

const menuInputDataType = new GraphQLInputObjectType({
    name: 'MenuInputData',
    fields: () => ({
        number: { type: GraphQLFloat },
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

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
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
        addMenu: {
            type: MenuType,
            args: {
                //GraphQLNonNull make these field required
                nameOfMenu: { type: new GraphQLNonNull(GraphQLString) },
                data: { type: new GraphQLList(menuInputDataType) },
                overallB: { type: new GraphQLNonNull(GraphQLFloat) },
                overallR: { type: new GraphQLNonNull(GraphQLFloat) },
                overallA: { type: new GraphQLNonNull(GraphQLFloat) },
                overallKcal: { type: new GraphQLNonNull(GraphQLFloat) },
            },
            resolve(parent, args) {
                let newMenu = new Menu({
                    nameOfMenu: args.nameOfMenu,
                    data: args.data,
                    overallB: args.overallB,
                    overallR: args.overallR,
                    overallA: args.overallA,
                    overallKcal: args.overallKcal,
                });
                return newMenu.save();
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
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});