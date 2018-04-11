var usersTimeline = (function() {

    var nextId = Date.now() + Math.floor(Math.random() * Math.floor(1000));

    function Post(text, img, username, avatar) {
        this.id = nextId++;
        this.text = text;
        this.img = img;
        this.username = username;
        this.avatar = avatar;
        this.replies = [];
    }

    function Reply(text, username, avatar) {
        this.text = text;
        this.username = username;
        this.avatar = avatar;
    }

    function Timeline() {
        if (localStorage.getItem("timelines") != null) {
            this.timelines = JSON.parse(localStorage.getItem("timelines"));
        } else {
            this.timelines = [];
        }
    }

    Timeline.prototype.removePost = function(id) {
        var index = this.timelines.findIndex(function(post) {
            return post.id == id;
        })
        var timelines = this.timelines;
        timelines.splice(index, 1)
    }

    Timeline.prototype.refreshPosts = function() {
        var posts = JSON.parse(localStorage.getItem('timelines'))
        var users = JSON.parse(localStorage.getItem('users'))
        if (posts != null) {
            posts.forEach(function(post) {
                var username = post.username;
                var user = users.find(function(user) {
                    return user.username == username;
                })

                if (user.moreInfo.img != post.avatar) {
                    post.avatar = user.moreInfo.img
                }

            })
            localStorage.setItem('timelines', JSON.stringify(posts))
        }

    }

    Timeline.prototype.addPost = function(text, img, username, avatar) {
        var post = new Post(text, img, username, avatar);
        this.timelines.unshift(post); // тук трябва да е unshift вместо push за да може най-новия пост да излиза най-отгоре 
        localStorage.setItem("timelines", JSON.stringify(this.timelines));
    };

    Timeline.prototype.getPosts = function(username) {
        return this.timelines.filter(function(post) {
            return post.username == username;
        })
    };

    Timeline.prototype.addReply = function(text, username, avatar, id) {
        var reply = new Reply(text, username, avatar)
        var index = this.timelines.findIndex(function(post) {
            return post.id == id;
        })
        this.timelines[index].replies.unshift(reply);
        localStorage.setItem("timelines", JSON.stringify(this.timelines));
    }

    return new Timeline()
})()