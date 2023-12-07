const authFunctions = {
  logout: async (req, res) => {
    // console.log(req.session.userId);
    req.session.destroy();
    res.json({ success: true });
  },
};
export default authFunctions;
