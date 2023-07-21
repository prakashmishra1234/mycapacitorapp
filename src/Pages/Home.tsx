import axios from "axios";
import React from "react";
import NewsCard from "../Components/NewsCard";
import { Box, Divider, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { isPlatform } from "@ionic/react";

interface sources {
  id: string;
  name: string;
}
export interface articles {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: sources;
  title: string;
  url: string;
  urlToImage: string;
}

export interface NewsCardProps {
  data: articles;
}
interface filterOpt {
  key: string;
  value: string;
}
const countryfilter = [
  {
    key: "in",
    value: "India",
  },
  {
    key: "us",
    value: "United States",
  },
  {
    key: "ch",
    value: "China",
  },
  {
    key: "fr",
    value: "France",
  },
];

const Home = () => {
  const [news, setnews] = React.useState<articles[]>([]);
  const [country, setCountry] = React.useState<filterOpt>({
    key: "in",
    value: "India",
  });

  React.useEffect(() => {
    getNews();
  }, [country]);

  const getNews = () => {
    axios
      .get(
        `https://newsapi.org/v2/top-headlines?country=${country.key}&apiKey=17d9c39f11344786a19ea5c16693c5ea`
      )
      .then((res) => {
        setnews(res?.data?.articles ?? []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: { md: "row", xs: "column" } }}>
      Home
    </Box>
  );
};

export default Home;
