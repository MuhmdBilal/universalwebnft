import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation adminLogin($email: String!,$password: String!){
        adminLogin(email: $email,password: $password){
            loginToken
            adminUser{
                name
                surname
            }
        }
    } 
`;