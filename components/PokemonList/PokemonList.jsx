import { Button, Card, Col, Pagination, Row, Tag } from "antd";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "../../graphql/gql";
import { SyncOutlined } from "@ant-design/icons";
import { useState } from "react";
import Layout from "../layout/Layout";

const limit = 8;

function PokemonList() {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: {
      limit,
      offset: (page - 1) * limit,
    },
  });

  if (loading)
    return (
      <div className="loading">
        <Tag color="orange" icon={<SyncOutlined spin />}>
          LOADING
        </Tag>
      </div>
    );
  if (error) return `Error! ${error.message}`;

  console.log("Response from server", data);

  // console.log(props.pokemons.pokemons.results);

  // console.log(props);

  return (
    <div className="morePokemon">
      <div className="Layout">
        <Layout></Layout>
      </div>
      <Row gutter={[16, 16]} className="card-wrapper" align="center">
        {data.pokemons.results.map((val) => {
          return (
            <Col span={5} key={val.name}>
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
                cover={<img className="pokemon" src={val.artwork} />}
              >
                <p className="cardtext">{val.name}</p>
                <Link
                  href={"/single-pokemon/[pokemonId]"}
                  as={`/single-pokemon/${val.name}`}
                >
                  <Button className="seemore">
                    <p className="buttontext">see more</p>
                  </Button>

                  {/* <div className="seemore">
                    <p className="buttontext">See More</p>
                  </div> */}
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Pagination
        responsive
        // simple
        showSizeChanger={false}
        onChange={(newPage) => {
          setPage(newPage);
        }}
        defaultCurrent={1}
        current={page}
        total={data.pokemons.count}
      />
      ;
    </div>
  );
}

export default PokemonList;
