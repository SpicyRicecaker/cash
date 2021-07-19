import mongoose from 'mongoose';
const { Schema } = mongoose;

const mongoDBURI = import.meta.env.VITE_MONGODB_URI as string;
// const ip = import.meta.env.VITE_IP as string;

mongoose
    .connect(mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => console.log(err.reason));

const userSchema = new Schema({
    name: String, // String is shorthand for {type: String}
    books: [{
        name: String,
        url: String,
        content: {
            type: String,
            value: String
        },
        nextChapter: {
            type: String,
            value: String
        },
        prevChapter: {
            type: String,
            value: String
        },
    }],
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
