import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { ScrollView } from "react-native-gesture-handler";
import * as Speech from "expo-speech"
let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class StoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      speakerColor:"gray",
      speakerIcon:"volume-high-outline"
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }
  async initiateTTS(title, author, story, moral) 
  { const current_color = this.state.speakerColor; 
    this.setState({ speakerColor: current_color === "gray" ? "#ee8249" : "gray" });
     if (current_color === "gray") { Speech.speak(`${title} by ${author}`); Speech.speak(story); 
     Speech.speak("The moral of the story is!"); Speech.speak(moral); } else { Speech.stop(); } }
  render() {
      if(!this.props.route.params){this.state.navigation.navigate("Home")}
    else if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}> 
        <SafeAreaView style={styles.droidArea}></SafeAreaView>
        <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>Storytelling App</Text>
            </View>
          </View>
          <View style={styles.storyContainer}>
              <ScrollView>
              <Image
              source={require("../assets/story_image_1.png")}
              style={styles.storyImage}
            ></Image>
            <View style={styles.dataContainer}>
                <View style={styles.titleTextContainer}>
                    <Text style={styles.storyTitleText}> {this.props.route.params.story.title} </Text>
                    <Text style={styles.storyAuthorText}> {this.props.route.params.story.author} </Text>
                    <Text style={styles.storyAuthorText}> {this.props.route.params.story.created_on} </Text>
                </View>
                <View style={styles.iconContainer}> <TouchableOpacity 
                onPress={() => this.initiateTTS( this.props.route.params.story.title, 
                    this.props.route.params.story.author, 
                    this.props.route.params.story.story, 
                    this.props.route.params.story.moral ) } >
                         <Ionicons name={this.state.speakerIcon} 
                         size={RFValue(30)} color={this.state.speakerColor} 
                         style={{ margin: RFValue(15) }} />
                          </TouchableOpacity> 
                          </View> </View> 
                          <View style={styles.storyTextContainer}>
                               <Text style={styles.storyText}> 
                               {this.props.route.params.story.story}
                                </Text> 
                                <Text style={styles.moralText}> 
                                Moral - {this.props.route.params.story.moral} 
                                </Text> </View> 
                                <View style={styles.actionContainer}>
                                     <View style={styles.likeButton}> 
                                     <Ionicons name={"heart"} size={RFValue(30)} color={"white"} /> 
                                     <Text style={styles.likeText}>12k</Text> 
                                     </View>
            </View>
              </ScrollView>
            

            <View style={styles.titleContainer}>
              <Text style={styles.storyTitleText}>
                {this.props.story.title}
              </Text>
              <Text style={styles.storyAuthorText}>
                {this.props.story.author}
              </Text>
              <Text style={styles.descriptionText}>
                {this.props.story.description}
              </Text>
            </View>
            <View style={styles.actionContainer}>
              <View style={styles.likeButton}>
                <Ionicons name={this.state.speakerIcon} size={RFValue(30)} color={"white"} style={{margin:RFValue(15)}} />
                <Text style={styles.likeText}>12k</Text>
              </View>
            </View>
          </View>
        
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  storyImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  storyTitleText: {
    fontSize: RFValue(25),
    fontFamily: "Bubblegum-Sans",
    color: "white"
  },
  storyAuthorText: {
    fontSize: RFValue(18),
    fontFamily: "Bubblegum-Sans",
    color: "white"
  },
  descriptionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 13,
    color: "white",
    paddingTop: RFValue(10)
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  }
});
