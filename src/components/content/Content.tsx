import React from "react";
import Experience from "../experience/Experience";
import { View } from "@react-three/drei";

type Props = {};

const Content = (props: Props) => {
  return (
    <main>
      <View>
        <Experience />
      </View>
    </main>
  );
};

export default Content;
