import React, { useCallback, useState } from "react";
import { Text, View } from "react-native";

const ReadMore = ({ numberOfLines, children }) => {
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length > numberOfLines); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  return (
    <View>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : numberOfLines}
        style={{ fontSize: 16, color: "black" }}
      >
        {children}
      </Text>

      {lengthMore ? (
        <Text
          onPress={toggleNumberOfLines}
          style={{ color: "#da6786", fontSize: 16 }}
        >
          {textShown ? "Read less" : "Read more"}
        </Text>
      ) : null}
    </View>
  );
};

export default ReadMore;
