const getStepContent = (step) => {
  switch (step) {
    case 0:
      return (
        <BusinessInformation
          formData={formData}
          handleInputChange={handleInputChange}
          serviceCategories={serviceCategories}
        />
      );
    case 1:
      return (
        <ContactInformation
          formData={formData}
          handleInputChange={handleInputChange}
        />
      );
    case 2:
      return (
        <BusinessImages
          formData={formData}
          handleImageChange={handleImageChange}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
        />
      );
    default:
      return null;
  }
};
