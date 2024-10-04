const post = require("../model/postpanel");
const User = require('../model/userpanel');

module.exports.add_post = async (req, res) => {
    try {
        if (req.body) {
            const userData = await User.findById(req.user._id);
            if (userData) {
                const checkData = await post.findOne({ title: req.body.title });
                if (checkData) {
                    return res.status(200).json({ mes: "Post Data insert already", status: 1 })
                }
                else {
                    req.body.Created_date = new Date().toLocaleDateString();
                    req.body.Updated_date = new Date().toLocaleString();
                    req.body.author = userData.id;
                    const newpost = await post.create(req.body);
                    if (newpost) {
                        return res.status(200).json({ mes: "Post Data successfully insert", newpost: newpost, status: 1 })
                    }
                    else {
                        return res.status(200).json({ mes: "post not found", status: 0 })
                    }

                }
            }
            else {
                return res.status(200).json({ mes: "User not found", status: 0 })
            }
        }
        else {
            return res.status(200).json({ mes: "invliad Data", status: 0 })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ mes: "something worng", status: 0 })
    }
}
module.exports.viewPost = async (req, res) => {
    try {
        const viewData = await post.find({ author: req.user._id })
        if (viewData != "") {
            return res.status(200).json({
                msg: "Here is all post data", viewData: viewData, status: 1
            });
        } else {
            return res.status(200).json({ msg: "No post found", status: 0 });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ mes: "something worng", status: 0 })
    }
}

module.exports.deletePost = async (req, res) => {
    try {
        let deletedata = await post.findByIdAndDelete(req.params.id, req.body)
        if (deletedata) {
            return res.status(200).json({ mes: "Delete record sucessfully", deletedata: deletedata, status: 1 });
        }
        else {
            return res.status(200).json({ mes: "invliad Data", status: 0 });

        }
    } catch (error) {
        console.log(error);
        return req.status(400).json({ mes: "something worng", status: 0 })
    }
}
module.exports.editPost = async (req, res) => {
    try {
        let editdata = await post.findByIdAndUpdate(req.params.id, req.body)
        if (editdata) {
            return res.status(200).json({ mes: "Edit record sucessfully", editdata: editdata, status: 1 });
        }
        else {
            return res.status(200).json({ mes: "invliad Data", status: 0 });

        }
    } catch (error) {
        console.log(error);
        return req.status(400).json({ mes: "something worng", status: 0 })
    }
}


