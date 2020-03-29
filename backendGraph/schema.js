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
const Menu = require('./models/Menu');
const TechCard = require('./models/TechCard');

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

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        TechCard: {
            type: TechCardType,
            args: { nameOfCard: { type: GraphQLString } },
            resolve(parentValue, args) {
                return TechCard.findOne({ nameOfCard: args.nameOfCard })
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
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});