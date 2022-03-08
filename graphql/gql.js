import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        id
        url
        name
        artwork
      }
    }
  }
`;

export const SINGLE_POKEMON_QUERY = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
        back_shiny
      }
      moves {
        move {
          name
        }
      }
      stats {
        stat {
          name
        }
      }
      types {
        type {
          name
        }
      }
      stats {
        base_stat
        effort
        stat {
          name
        }
      }
      species {
        url
        name
      }
    }
  }
`;
