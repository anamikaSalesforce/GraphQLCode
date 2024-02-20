import { LightningElement,wire } from 'lwc';
import {gql,graphql} from 'lightning/uiGraphQLApi';

export default class GraphQLAccounts extends LightningElement {
  results;
  errors;
  contactResults;

 @wire(graphql, {
    query: gql`
      query GetAccounts {
        uiapi {
          query {
            Account(first: 5) {
              edges {
                node {
                  Id
                  Name {
                    value
                  }
                  Contacts {
                      edges {
                          node {
                              LastName {
                                  value
                              }
                          }
                      }
                  }
                }
              }
            }
          }
        }
    }`,
 })
   
  graphqlQueryResult({ data, errors }) {
    if (data) {
      var abc=[];
      this.results = data.uiapi.query.Account.edges.map((edge) => edge.node);
      console.log("🚀 ~ this.results:", JSON.stringify(this.results));
      this.results.forEach(currentItem => {
            currentItem.Contacts.edges.forEach(item => {
              abc.push(item.node.LastName.value);
            }) ; 
      });
      console.log("🚀 ~ this.abc:", JSON.stringify(abc));
      this.contactResults=abc;
    }
    
    this.errors = errors;
  }
}