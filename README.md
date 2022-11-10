# xenon-assignment

Hi,

Xenon backend is developed using node.js and MongoDB as its database. Codebase is developed using **Typescript**.
>Please make sure the backend is seperated from frontend so if you are willing to run it locally make sure you run both projects parallely, and din't forget gto chnage the axiosInstance *baseUrl* to localhost els eit willn't replect any change done in API.

Below are the gievn endpoints post route Methods.

* `Method: Get "/"`
This is to check whether the API is working or not.

* `Method: Post '/product/get-products'`
This route will fetch all the existing products from Database.

* `Method: Post '/product/create'`
This will create a product. It takes **title, description, imageUrl, price** to make a call. Make sure the validation is implemented so may throw an error message.

* `MethodL Post '/product/delete-by-id'`
This will delete the product. It takes schema `_id` as an argument and leverage `findByIdAndRemove()` method for deleting the product. Make sure the validation is implemented so may throw an error message. Product may not be deleted if not **logged in**.

* `Method: Post '/user/signup'`
User needs to provide **name, email, password, confirmPassword** to make an entry. Validation is performing on backend side. Password is ecncrypted using bcrypt.js

* `Method: Post '/user/login'`
User will be able to login if **email and password** match. Validation is performing on backend side. Setting a localStorage item for checking rapidly.

* `Method: Post '/user/comtact-us'`
User may send a message to the creator providing his **name, email, and description**. Need sto provide all as a part of validation.

* `/logout`
removing the localStorage item to determine the user is logged out.
