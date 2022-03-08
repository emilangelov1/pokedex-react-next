import { useQuery } from "@apollo/client";
import { Card, Space, Tag } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SINGLE_POKEMON_QUERY } from "../../graphql/gql";
import { SyncOutlined } from "@ant-design/icons";
import Layout from "../../components/layout/Layout";

export default function SinglePokemon() {
  const router = useRouter();
  const { data, loading, error } = useQuery(SINGLE_POKEMON_QUERY, {
    variables: {
      name: router.query.pokemonId,
    },
  });

  const [color, setColor] = useState();
  useEffect(() => {
    fetch(data?.pokemon?.species?.url)
      .then((response) => response.json())
      .then((moreDetails) => {
        setColor(() => moreDetails.color.name);
      });
  }, [data]);

  if (loading)
    return (
      <div className="loading">
        <Tag color="orange" icon={<SyncOutlined spin />}>
          LOADING
        </Tag>
      </div>
    );
  if (error) return `Error! ${error.message}`;

  // console.log(data.pokemon.stats.stat.name);

  return (
    <div className="singlePokemon">
      <Layout></Layout>
      <Card
        style={{
          backgroundColor: "#faad14",
          maxWidth: 550,
          minWidth: 150,
          borderRadius: "8px",
          border: "none",
          cursor: "auto",
        }}
        hoverable
        cover={
          <img className="pokemon" src={data.pokemon.sprites.front_default} />
        }
      >
        <p className="cardtext">{data.pokemon.name}</p>
        <div className="tag">
          <Tag color={color} icon={<SyncOutlined spin />}>
            {data?.pokemon?.types[0]?.type?.name} Type
          </Tag>
        </div>
      </Card>
      <Space />
      {/* {data.pokemon.moves.map((val) => {
        return {val.move.name};
      })} */}
    </div>
  );
}
