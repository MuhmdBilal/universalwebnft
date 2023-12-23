import { gql } from '@apollo/client';

export const GET_NOTIFICATIONS = gql`
	{
		notifications @client{
			text
			success
			error
		}
	}
`;