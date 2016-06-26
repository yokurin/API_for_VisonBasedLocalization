# API v1

REST API Doc


## Login [/auth/login]

### Login [POST]

+ Request (application/json)

    + Header

            Accept-Charset: utf-8
            <!--Connection: keep-alive-->

    + Body

            {
                "uuid": "XXXXXXX"-XXXX-XXXX-XXXX-XXXXXXXXXXXXX"
            }

+ Response 200 (application/json)

    + Body

            {
                "message": "success",
                "error": []
            }



## Upload Image [/upload/image]

### Image [POST]

+ Request (application/json)

    + Header

            Accept-Charset: utf-8
            <!--Connection: keep-alive-->

    + Body

            {
                "uuid": "XXXXXXX"-XXXX-XXXX-XXXX-XXXXXXXXXXXXX",
                "image": "base64(image)"
            }

+ Response 200 (application/json)

    + Body

            {
                "message": "success",
                "error": []
            }


## Post Form Answer [/formAnswer]

### アンケート [POST]

+ Request (application/json)

    + Header

            Accept-Charset: utf-8
            <!--Connection: keep-alive-->

    + Body

            {
                "uuid": "XXXXXXX"-XXXX-XXXX-XXXX-XXXXXXXXXXXXX",
                "name": "XXXXX",
                "sex": "男",
                "useful": 1,
                "joyful": 5,
                "opinion": "aaaaaaaaaaaaaaaaaaaa"
            }

+ Response 200 (application/json)

    + Body

            {
                "message": "success",
                "error": []
            }
