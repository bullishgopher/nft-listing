import { useState, useEffect } from 'react'
import { jsonToGraphQLQuery } from 'json-to-graphql-query'
import queries from '../contracts/queries.json'

const GRAPH_URL = 'https://api.thegraph.com/subgraphs/name/vince0656/brand-central'

export default function useSubgraphData() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const query = jsonToGraphQLQuery({ query: queries['getAllTickers'] });

  useEffect(() => {
    getSubgraphData();
  }, [])

  const getSubgraphData = async () => {
    setLoading(true);
    try {
      const res = await fetch(GRAPH_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      });

      const { data } = await res.json();
      setData(data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }

  return {
    loading,
    data,
  }
}
