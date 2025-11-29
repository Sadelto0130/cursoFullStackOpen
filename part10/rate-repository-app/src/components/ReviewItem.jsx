import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { format } from 'date-fns'

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  reviewCard:{
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    width: "100%",
  },
  ratingCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#646cff",
    justifyContent: "center",
    alignItems: "center",
  },
  ratingText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  reviewContent: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  date: {
    color: "gray",
    marginBottom: 6,
    fontSize: 12,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
});

const ReviewItem = ({review}) => {
  const dateFormat = (date) => {return format(new Date(date), "dd/MM/yyyy")}

  return (
    <View style={styles.reviewCard}>
      <View style={styles.ratingCircle}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>

      <View style={styles.reviewContent}>
        <Text style={styles.username}>{review?.user?.username}</Text>
        <Text style={styles.date}>
          {dateFormat(review.createdAt)}
        </Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;

