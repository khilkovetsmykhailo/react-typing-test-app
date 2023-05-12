import { Schema, model } from "mongoose";

const testSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    accuracy: {
      type: String,
      required: true,
    },
    wordCount: {
      type: Number,
      required: true,
    },
    characterCount: {
      type: Number,
      required: true,
    },
    wpm: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const TestModel = model("Test", testSchema);

export default TestModel;
