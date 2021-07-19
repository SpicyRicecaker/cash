import mongoose from 'mongoose';
const { Schema } = mongoose;

const mongoDBURI = import.meta.env.VITE_MONGODB_URI as string;
// const ip = import.meta.env.VITE_IP as string;

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

// db.once('open', function () {
//     User.find({ name: 'SpicyRicecaker' }, (err, person) => {
//         if (err) return console.error(err);
//         console.log("success!", person[0].books);
//     });
//     we're connected!
//     const user = new User({
//         name: "SpicyRicecaker", // String is shorthand for {type: String}
//         books: [{
//             name: "test",
//             url: ip,
//             content: {
//                 type: "selector",
//                 value: ".mt-5"
//             },
//             nextChapter: {
//                 type: "innerHTML",
//                 value: "Next chapter"
//             },
//             prevChapter: {
//                 type: "innerHTML",
//                 innerHTML: "Prev chapter"
//             },
//         }],
//     });
//     user.save(function (err: Error, _user: typeof User) {
//         if (err) return console.error(err);
//     });

//     User.find({ name: 'SpicyRicecaker' }, (err, person) => {
//         if (err) return console.error(err);
//         console.log("success!", person[0].books);
//     });
// });
