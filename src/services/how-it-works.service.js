async function fetchHowItWorksResponse() {
  try {
    const resp = await fetch(
      "https://uqnzta2geb.execute-api.us-east-1.amazonaws.com/default/FrontEndCodeChallenge"
    );
    return await resp.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

function compareHowItWorksSteps(stepA, stepB) {
  const stepANumber = stepA.stepNumber;
  const stepBNumber = stepB.stepNumber;

  let comparison = 0;
  if (stepANumber > stepBNumber) {
    comparison = 1;
  } else if (stepANumber < stepBNumber) {
    comparison = -1;
  }

  return comparison;
}

function sortHowItWorksResponse(responseJson) {
  return [...responseJson].sort(compareHowItWorksSteps);
}

function compareVersionContents(versionContentA, versionContentB) {
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
}

function filterHowItWorksResponse(responseJson) {
  return responseJson.map(step => {
    const { id, stepNumber, versionContent } = step;
    const sortedVersionContent = [...versionContent].sort(
      compareVersionContents
    );
    // grab the last item in the array because of how it's sorted
    const shiftedVersionContent = sortedVersionContent.pop();
    return {
      id,
      stepNumber,
      title: shiftedVersionContent.title,
      body: shiftedVersionContent.body
    };
  });
}

async function fetchSortAndFilterHowItWorksResponse() {
  const responseJson = await fetchHowItWorksResponse();
  const sortedJson = sortHowItWorksResponse(responseJson);
  const filteredJson = filterHowItWorksResponse(sortedJson);
  return filteredJson;
}

export default fetchSortAndFilterHowItWorksResponse;
