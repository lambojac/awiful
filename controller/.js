//getallusers
export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await User.find().select("-password"); // Exclude password
  
      // Transform data to match required format
      const formattedUsers = users.map((user) => ({
        ...user.toObject(), // Convert Mongoose document to plain object
        status: user.isDeleted ? "non-active" : "active", // Set status
      }));
  
      res.status(200).json(formattedUsers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  
  
  //getuserbyid
  export const getUserById = async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id).select("-password"); // Exclude password
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({
        ...user.toObject(), // Convert Mongoose document to plain object
        status: user.isDeleted ? "non-active" : "active", // Set status
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  