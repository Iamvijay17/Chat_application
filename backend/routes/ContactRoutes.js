import User from "../models/UserModel.js";

export const SearchContact = async (request, response, next) => {
    try {
        const { search } = request.body;
        if (search === undefined || search === null) {
            
            return response.status(200).send("SearchTerm is required");
        }

        const SearchTermRegex = search.replace(
            /[ .* +?^${}()|[\]\\]/g,
            "\\$&"
        );

        const regex = new RegExp(SearchTermRegex, "i");
        const contacts = await User.find({
            $and: [{_id: {$ne:request.userId}},
                {$or: [{firstName:regex}, {lastName:regex}, {email:regex}]}
            ],
        });
        
        return response.status(200).json({contacts});
     

    } catch (error) {
        console.log({ error })
        return response.status(500).send("Internal Server Error")
    }
}