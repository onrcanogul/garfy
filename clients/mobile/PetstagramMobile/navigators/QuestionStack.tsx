import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BlogScreen from "../screens/blog/BlogScreen";
import CreateQuestionScreen from "../screens/blog/CreateQuestionScreen";

const Stack = createStackNavigator();

const QuestionStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Blog"
        component={BlogScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CreateQuestion"
        component={CreateQuestionScreen}
        options={{
          headerShown: false, // Üst header'ı gizler
          presentation: "modal", // Şeffaf modal stili
        }}
      />
    </Stack.Navigator>
  );
};

export default QuestionStack;
