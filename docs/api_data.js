define({ "api": [
  {
    "type": "delte",
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
    "name": "DelteReviewTopicid"
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
            "optional": false,
            "field": "star",
            "description": "<p>Star of review (1 &lt;= star &lt;= 5)</p>"
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
    "type": "delte",
    "url": "/topic/:topicId",
    "title": "5. Delete Topic",
    "group": "Topic",
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
    "filename": "routesAPI/topic.js",
    "groupTitle": "Topic",
    "name": "DelteTopicTopicid"
  },
  {
    "type": "get",
    "url": "/topic",
    "title": "1.  Get lists of topic information",
    "group": "Topic",
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
            "type": "String",
            "optional": false,
            "field": "object.detail",
            "description": "<p>Detail of topic</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "object.note",
            "description": "<p>Note of topic</p>"
          },
          {
            "group": "Success",
            "type": "Date",
            "optional": false,
            "field": "object.date",
            "description": "<p>Date start of topic</p>"
          },
          {
            "group": "Success",
            "type": "Object[]",
            "optional": false,
            "field": "object.group",
            "description": "<p>List members of group topic</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "object.group._id",
            "description": "<p>ID of member's topic</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "object.group.name",
            "description": "<p>Name of member's topic</p>"
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
            "type": "Object[]",
            "optional": false,
            "field": "object.review",
            "description": "<p>Object array have 1 element. It is a average rate of topic</p>"
          },
          {
            "group": "Success",
            "type": "Object[]",
            "optional": false,
            "field": "object.participants",
            "description": "<p>Object array have 1 element. It is a total participants of topic.</p>"
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
    "filename": "routesAPI/topic.js",
    "groupTitle": "Topic",
    "name": "GetTopic"
  },
  {
    "type": "get",
    "url": "/topic/:topicId",
    "title": "3. Get topic information",
    "group": "Topic",
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
            "type": "String",
            "optional": false,
            "field": "object.detail",
            "description": "<p>Detail of topic</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "object.note",
            "description": "<p>Note of topic</p>"
          },
          {
            "group": "Success",
            "type": "Date",
            "optional": false,
            "field": "object.date",
            "description": "<p>Date start of topic</p>"
          },
          {
            "group": "Success",
            "type": "Object[]",
            "optional": false,
            "field": "object.group",
            "description": "<p>List members of group topic</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "object.group._id",
            "description": "<p>ID of member's topic</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "object.group.name",
            "description": "<p>Name of member's topic</p>"
          },
          {
            "group": "Success",
            "type": "Object[]",
            "optional": false,
            "field": "object.participants",
            "description": "<p>List participants of topic</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "object.participants._id",
            "description": "<p>ID of participants's topic</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "object.participants.name",
            "description": "<p>Name of participants's topic</p>"
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
            "type": "Object[]",
            "optional": false,
            "field": "object.review",
            "description": "<p>Review of members</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "object.review.reviewOfUser",
            "description": "<p>Content of review</p>"
          },
          {
            "group": "Success",
            "type": "Number",
            "optional": false,
            "field": "object.review.star",
            "description": "<p>Star of review</p>"
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
    "filename": "routesAPI/topic.js",
    "groupTitle": "Topic",
    "name": "GetTopicTopicid"
  },
  {
    "type": "get",
    "url": "/topic/:topicId/join",
    "title": "6.  Get status of participant's topic",
    "group": "Topic",
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
            "type": "Boolean",
            "optional": false,
            "field": "object.statusParticipant",
            "description": "<p>Status of participant's topic</p>"
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
    "filename": "routesAPI/topic.js",
    "groupTitle": "Topic",
    "name": "GetTopicTopicidJoin"
  },
  {
    "type": "post",
    "url": "/topic",
    "title": "2. Create Topic",
    "group": "Topic",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of topic</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "detail",
            "description": "<p>Detail of topic</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "note",
            "description": "<p>Note of topic</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Date start of topic</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "group",
            "description": "<p>Array userID is members</p>"
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
    "filename": "routesAPI/topic.js",
    "groupTitle": "Topic",
    "name": "PostTopic"
  },
  {
    "type": "post",
    "url": "/topic/:topicId/join",
    "title": "7.  Join topic",
    "group": "Topic",
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
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message of request</p>"
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
    "filename": "routesAPI/topic.js",
    "groupTitle": "Topic",
    "name": "PostTopicTopicidJoin"
  },
  {
    "type": "put",
    "url": "/topic/:topicId",
    "title": "4. Update Topic",
    "group": "Topic",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of topic</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "detail",
            "description": "<p>Detail of topic</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "note",
            "description": "<p>Note of topic</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Date start of topic</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "group",
            "description": "<p>Array userID is members</p>"
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
    "filename": "routesAPI/topic.js",
    "groupTitle": "Topic",
    "name": "PutTopicTopicid"
  },
  {
    "type": "get",
    "url": "/user",
    "title": "Get lists of user information",
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
  }
] });
