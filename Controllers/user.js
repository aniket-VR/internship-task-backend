import { userModel } from "../Models/user.js";

export async function getAllUser(req, res) {
  try {
    const { page, limit, domain, gender, available, name } = req.query;
    console.log(req.query);
    const skipUser = page && limit ? (page - 1) * limit : 0;
    let option = {};
    if (domain) {
      option = { ...option, domain: domain };
    }
    if (gender) {
      option = { ...option, gender: gender };
    }
    if (available) {
      option = { ...option, available: available };
    }
    var totalUser = 0;
    var finalResult = [];
    if (name != undefined) {
      const result = await userModel.find({
        first_name: { $regex: name, $options: "i" },
        ...option,
      });
      totalUser = result.length;
      finalResult = await userModel
        .find({
          first_name: { $regex: name, $options: "i" },
          ...option,
        })
        .skip(skipUser)
        .limit(limit);
    } else {
      finalResult = await userModel.find();
    }
    console.log(totalUser);
    if (finalResult) {
      res.status(200).send({
        data: finalResult,
        message: "users found",
        total: totalUser,
      });
    } else {
      res.status(404).send({
        message: "users not found",
      });
    }
  } catch (error) {
    res.status(500).send("internal server error");
  }
}
export async function getUserById(req, res) {
  try {
    const result = await userModel.findById(req.params.id);
    console.log(result);
    if (result) {
      res.status(200).send({
        data: result,
        message: "user found",
      });
    } else {
      res.status(404).send({
        message: "user not found",
      });
    }
  } catch (error) {
    res.status(500).send("internal server error");
  }
}
export async function createUser(req, res) {
  try {
    console.log(req.body);
    const { first_name, last_name, email, gender, avatar, domain, available } =
      req.body;
    const result = await userModel.create({
      first_name,
      last_name,
      email,
      gender,
      avatar,
      domain,
      available,
    });
    if (result) {
      res.status(200).send({
        message: "user created",
      });
    } else {
      res.status(404).send({
        message: "user not created",
      });
    }
  } catch (error) {
    res.status(500).send("internal server error");
  }
}
export async function updateCurrentUser(req, res) {
  try {
    const { first_name, last_name, email, gender, avatar, domain, available } =
      req.body;
    const id = req.params.id;
    const result = await userModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          first_name,
          last_name,
          email,
          gender,
          avatar,
          domain,
          available,
        },
      }
    );
    if (result) {
      res.status(200).send({
        message: "user updated",
      });
    } else {
      res.status(404).send({
        message: "user not update",
      });
    }
  } catch (error) {
    res.status(500).send("internal server error");
  }
}
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const result = await userModel.findByIdAndDelete(id);
    if (result) {
      res.status(200).send({
        message: "user delete",
      });
    } else {
      res.status(404).send({
        message: "user not found",
      });
    }
  } catch (error) {
    res.status(500).send("internal server error");
  }
}
