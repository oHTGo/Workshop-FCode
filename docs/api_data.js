define({ "api": [
  {
    "type": "delete",
    "url": "/review/:topicId",
    "title": "4. Delete review",
    "group": "Review",
    "error": {
      "fields": {
        "Response": [
          {
            "group": "Response",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status when complete</p>"
          },
          {
            "group": "Response",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message when complete</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routesAPI/review.js",
    "groupTitle": "Review",
    "name": "DeleteReviewTopicid"
  },
  {
    "type": "get",
    "url": "/review/:topicId",
    "title": "1.  Get review",
    "group": "Review",
    "success": {
      "fields": {
        "Success": [
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of request</p>"
          },
          {
            "group": "Success",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Object request</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "object._id",
            "description": "<p>ID of review</p>"
          },
          {
            "group": "Success",
            "type": "Number",
            "size": "1-5",
            "optional": false,
            "field": "object.star",
            "description": "<p>Star of review</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "object.reviewOfUser",
            "description": "<p>Content of review</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status when complete</p>"
          },
          {
            "group": "Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message when complete</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routesAPI/review.js",
    "groupTitle": "Review",
    "name": "GetReviewTopicid"
  },
  {
    "type": "post",
    "url": "/review/:topicId",
    "title": "2. Create review",
    "group": "Review",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "size": "1-5",
            "optional": false,
            "field": "star",
            "description": "<p>Star of review</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "reviewOfUser",
            "description": "<p>Content of review</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Response": [
          {
            "group": "Response",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status when complete</p>"
          },
          {
            "group": "Response",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message when complete</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routesAPI/review.js",
    "groupTitle": "Review",
    "name": "PostReviewTopicid"
  },
  {
    "type": "put",
    "url": "/review/:topicId",
    "title": "3. Update review",
    "group": "Review",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "size": "1-5",
            "optional": false,
            "field": "star",
            "description": "<p>Star of review</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "reviewOfUser",
            "description": "<p>Content of review</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Response": [
          {
            "group": "Response",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status when complete</p>"
          },
          {
            "group": "Response",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message when complete</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routesAPI/review.js",
    "groupTitle": "Review",
    "name": "PutReviewTopicid"
  },
  {
    "type": "get",
    "url": "/user",
    "title": "1. Get lists of user information",
    "group": "User",
    "success": {
      "fields": {
        "Success": [
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of request</p>"
          },
          {
            "group": "Success",
            "type": "Object[]",
            "optional": false,
            "field": "message",
            "description": "<p>Array of object request</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "object._id",
            "description": "<p>ID of user</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "object.name",
            "description": "<p>Name of user</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status when complete</p>"
          },
          {
            "group": "Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message when complete</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routesAPI/user.js",
    "groupTitle": "User",
    "name": "GetUser"
  },
  {
    "type": "get",
    "url": "/user/current",
    "title": "2. Get current user information",
    "group": "User",
    "success": {
      "fields": {
        "Success": [
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of request</p>"
          },
          {
            "group": "Success",
            "type": "Object",
            "optional": false,
            "field": "message",
            "description": "<p>Object request</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "object._id",
            "description": "<p>ID of user</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "object.name",
            "description": "<p>Name of user</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status when complete</p>"
          },
          {
            "group": "Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message when complete</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routesAPI/user.js",
    "groupTitle": "User",
    "name": "GetUserCurrent"
  },
  {
    "type": "get",
    "url": "/user/topic",
    "title": "3. Get list topic of current user or get list all topic (if is admin)",
    "group": "User",
    "success": {
      "fields": {
        "Success": [
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of request</p>"
          },
          {
            "group": "Success",
            "type": "Object[]",
            "optional": false,
            "field": "message",
            "description": "<p>Array of object request</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "object._id",
            "description": "<p>ID of topic</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "object.name",
            "description": "<p>Name of topic</p>"
          },
          {
            "group": "Success",
            "type": "Object",
            "optional": false,
            "field": "object.author",
            "description": "<p>Information of author</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "object.author._id",
            "description": "<p>ID of author's topic</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "object.author.name",
            "description": "<p>Name of author's topic</p>"
          },
          {
            "group": "Success",
            "type": "Number",
            "optional": false,
            "field": "object.status",
            "description": "<p>Status of topic (0: waiting, 1: accept, -1: reject)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status when complete</p>"
          },
          {
            "group": "Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message when complete</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routesAPI/user.js",
    "groupTitle": "User",
    "name": "GetUserTopic"
  },
  {
    "type": "post",
    "url": "/user/topic/:topicId",
    "title": "4. Set status of topic (require is admin)",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>Status of topic (&quot;accept&quot; or &quot;reject&quot;)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status when complete</p>"
          },
          {
            "group": "Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message when complete</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routesAPI/user.js",
    "groupTitle": "User",
    "name": "PostUserTopicTopicid"
  }
] });
