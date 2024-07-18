"use client";
import React from "react";
import Home from "./Component/MyCard";

import { MantineProvider } from "@mantine/core";
import MyCard from "./Component/MyCard";
const page = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div>
        <MyCard />
      </div>
    </MantineProvider>
  );
};

export default page;
