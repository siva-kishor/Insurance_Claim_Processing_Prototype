//Imports

export const getClaim = async (req, res) => {
  res.json({
    message: "GetClaim Controller reached",
  });
};

export const indexClaim = async (req, res) => {
  //   const claim = index(req);
  console.log(req);
  return res.status(201).json({
    status: "success",
    message: "Claim Indexed Successfully",
    // data: claim,
  });
};

export const dataEntry = async (req, res) => {
  res.json({
    message: "DataEntry Controller reached",
  });
};

export const inspection = async (req, res) => {
  res.json({
    message: "Inspection Controller reached",
  });
};

export const qualityCheck = async (req, res) => {
  res.json({
    message: "QualityCheck Controller reached",
  });
};

export const redirectClaim = async (req, res) => {
  res.json({
    message: "Redirect Controller reached",
  });
};

export const approveClaim = async (req, res) => {
  res.json({
    message: "Approve Controller reached",
  });
};

export const rejectClaim = async (req, res) => {
  res.json({
    message: "Reject Controller reached",
  });
};

export const getAuditLog = async (req, res) => {
  res.json({
    message: "AuditLog Controller reached",
  });
};
