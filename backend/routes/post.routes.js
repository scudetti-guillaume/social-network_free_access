const express = require("express")
const router = express.Router();
const { checkUser, requireAuth , authUser } = require("../middleware/auth.middleware");
const postController = require('../controllers/post.controller');

const image = require("../middleware/picture.post.middleware");
const { multerErrors } = require("../utils/errors.utils");

router.get('/', postController.readPost);
router.put('/:id',  checkUser, postController.updatePost);
router.delete('/:id',authUser, postController.deletePost);
router.patch('/like-post/:id',authUser, postController.likePost);
router.patch('/unlike-post/:id',authUser, postController.unLikePost);



// router post + multer errors \\

router.post('/', authUser, (req, res, next) => {
    image(req, res, function (err) {
      if (err) {
        console.log(err.message);
        const errors = multerErrors(err);
        res.status(400).json({ errors });
      } else {
        console.log(req.user);
        next();
      }
    });
  },postController.createPost);


// gestion des commentaire\\

router.patch('/comment-post/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.patch('/delete-comment-post/:id', postController.deleteCommentPost );


module.exports = router;