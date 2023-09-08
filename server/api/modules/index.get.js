import ModulesModel from '~~/server/models/modules';

export default defineEventHandler(
    async (ctx) => {
      try {
      // Retrieve query parameters from the context
        const query = getQuery(ctx);
        let data;

        // Check if the query includes a "sectionName" parameter
        if (query.sectionName) {
        // If "sectionName" is present,
        // find a document in ModulesModel with matching sectionName
          data = await ModulesModel.findOne({sectionName: query.sectionName});
          return data;
        } else {
        // If "sectionName" is not present,
        // retrieve all documents from ModulesModel
          data = await ModulesModel.find();
          return data;
        }
      } catch (e) {
      // Handle any errors that occur during data retrieval
        console.log(e);
      }
    },
);
