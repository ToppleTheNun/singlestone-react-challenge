const fetchHowItWorksResponse = async () => {
  try {
    const resp = await fetch(
      "https://uqnzta2geb.execute-api.us-east-1.amazonaws.com/default/FrontEndCodeChallenge"
    );
    return await resp.json();
  } catch (e) {
    console.error(e);
    return [];
  }
};

const compareHowItWorksSteps = (stepA, stepB) => {
  const stepANumber = parseInt(stepA.stepNumber);
  const stepBNumber = parseInt(stepB.stepNumber);

  let comparison = 0;
  if (stepANumber > stepBNumber) {
    comparison = 1;
  } else if (stepANumber < stepBNumber) {
    comparison = -1;
  }

  return comparison;
};

const sortHowItWorksResponse = responseJson => {
  return [...responseJson].sort(compareHowItWorksSteps);
};

const compareVersionContents = (versionContentA, versionContentB) => {
  const versionAEffectiveDate = versionContentA.effectiveDate;
  const versionBEffectiveDate = versionContentB.effectiveDate;

  const versionADate = new Date(versionAEffectiveDate);
  const versionBDate = new Date(versionBEffectiveDate);

  let comparison = 0;
  if (versionADate > versionBDate) {
    comparison = 1;
  } else if (versionADate < versionBDate) {
    comparison = -1;
  }

  return comparison;
};

const filterHowItWorksResponse = responseJson => {
  return responseJson.map(step => {
    const { id, stepNumber, versionContent } = step;
    const sortedVersionContent = [...versionContent].sort(
      compareVersionContents
    );
    // grab the last item in the array because it's sorted ascendingly
    const shiftedVersionContent = sortedVersionContent.pop();
    return {
      id,
      stepNumber,
      versionContent: [shiftedVersionContent]
    };
  });
};

const flattenHowItWorksResponse = responseJson => {
  return responseJson.map(step => {
    const { id, stepNumber, versionContent } = step;
    const { title, body } = versionContent[0];
    return {
      id,
      stepNumber,
      title,
      body
    };
  });
};

const fetchSortAndFilterHowItWorksResponse = async () => {
  const responseJson = await fetchHowItWorksResponse();
  const sortedJson = sortHowItWorksResponse(responseJson);
  const filteredJson = filterHowItWorksResponse(sortedJson);
  const flattenedJson = flattenHowItWorksResponse(filteredJson);
  return flattenedJson;
};

export default fetchSortAndFilterHowItWorksResponse;

// primarily for testing
export {
  sortHowItWorksResponse,
  filterHowItWorksResponse,
  flattenHowItWorksResponse
};
