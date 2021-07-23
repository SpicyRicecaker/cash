import mongoose from 'mongoose';
const { Schema, Types: { ObjectId } } = mongoose;

const mongoDBURI = (process.env.MONGODB_URI as string);

mongoose
    .connect(mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => console.log(err.reason));

// See https://stackoverflow.com/a/54320056 for what { typeKey: '$type' } means
// Basically by default type is used to define the type of the object explicitly
// Like typescript
// For any other language it wouldn't matter but for javascript in the future probably
// don't use reserved keywords as object properties
const inquisitorSchema = new Schema({
    type: String,
    value: String
}, { typeKey: '$type' });

const bookSchema = new Schema({
    name: String,
    url: String,
    content: inquisitorSchema,
    nextChapter: inquisitorSchema,
    prevChapter: inquisitorSchema
})

const userSchema = new Schema({
    name: String, // String is shorthand for {type: String}
    books: [bookSchema],
});

export const User = mongoose.model('User', userSchema);
export const ObjId = (): string => (new ObjectId().toHexString());