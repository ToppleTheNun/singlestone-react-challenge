import {
  sortHowItWorksResponse,
  filterHowItWorksResponse,
  flattenHowItWorksResponse
} from "./how-it-works.service";
import howItWorksResponse from "./__fixtures__/how-it-works-response";

describe("how-it-works.service", () => {
  describe("sortHowItWorksResponse", () => {
    let sortedHowItWorksResponse;

    beforeAll(() => {
      sortedHowItWorksResponse = sortHowItWorksResponse(howItWorksResponse);
    });

    it("sorts ascendingly based on stepNumber", () => {
      expect(sortedHowItWorksResponse.length).toBe(5);
      expect(sortedHowItWorksResponse[0].stepNumber).toBe("1");
      expect(sortedHowItWorksResponse[1].stepNumber).toBe("2");
      expect(sortedHowItWorksResponse[2].stepNumber).toBe("3");
      expect(sortedHowItWorksResponse[3].stepNumber).toBe("4");
      expect(sortedHowItWorksResponse[4].stepNumber).toBe("10");
    });
  });

  describe("filterHowItWorksResponse", () => {
    let filteredHowItWorksResponse;

    beforeAll(() => {
      filteredHowItWorksResponse = filterHowItWorksResponse(howItWorksResponse);
    });

    it("only keeps 1 version content", () => {
      expect(filteredHowItWorksResponse.length).toBe(5);
      expect(Array.isArray(filteredHowItWorksResponse[0].versionContent)).toBe(
        true
      );
      expect(filteredHowItWorksResponse[0].versionContent.length).toBe(1);
      expect(Array.isArray(filteredHowItWorksResponse[1].versionContent)).toBe(
        true
      );
      expect(filteredHowItWorksResponse[1].versionContent.length).toBe(1);
      expect(Array.isArray(filteredHowItWorksResponse[2].versionContent)).toBe(
        true
      );
      expect(filteredHowItWorksResponse[2].versionContent.length).toBe(1);
      expect(Array.isArray(filteredHowItWorksResponse[3].versionContent)).toBe(
        true
      );
      expect(filteredHowItWorksResponse[3].versionContent.length).toBe(1);
      expect(Array.isArray(filteredHowItWorksResponse[4].versionContent)).toBe(
        true
      );
      expect(filteredHowItWorksResponse[4].versionContent.length).toBe(1);
    });

    it("only keeps the most recent version content", () => {
      expect(filteredHowItWorksResponse.length).toBe(5);
      expect(Array.isArray(filteredHowItWorksResponse[0].versionContent)).toBe(
        true
      );
      expect(
        filteredHowItWorksResponse[0].versionContent[0].effectiveDate
      ).toBe("2019-05-04T03:04:05.000Z");
      expect(Array.isArray(filteredHowItWorksResponse[1].versionContent)).toBe(
        true
      );
      expect(
        filteredHowItWorksResponse[1].versionContent[0].effectiveDate
      ).toBe("2019-05-20T03:04:05.000Z");
      expect(Array.isArray(filteredHowItWorksResponse[2].versionContent)).toBe(
        true
      );
      expect(
        filteredHowItWorksResponse[2].versionContent[0].effectiveDate
      ).toBe("2019-04-04T05:04:05.000Z");
      expect(Array.isArray(filteredHowItWorksResponse[3].versionContent)).toBe(
        true
      );
      expect(
        filteredHowItWorksResponse[3].versionContent[0].effectiveDate
      ).toBe("2019-05-20T03:04:05.000Z");
      expect(Array.isArray(filteredHowItWorksResponse[4].versionContent)).toBe(
        true
      );
      expect(
        filteredHowItWorksResponse[4].versionContent[0].effectiveDate
      ).toBe("2019-05-20T03:04:05.000Z");
    });
  });

  describe("flattenHowItWorksResponse", () => {
    let filteredHowItWorksResponse;
    let flattenedHowItWorksResponse;

    beforeAll(() => {
      filteredHowItWorksResponse = filterHowItWorksResponse(howItWorksResponse);
      flattenedHowItWorksResponse = flattenHowItWorksResponse(
        filteredHowItWorksResponse
      );
    });

    it("removes the versionContent field", () => {
      expect(flattenedHowItWorksResponse.length).toBe(5);
      expect(flattenedHowItWorksResponse[0].versionContent).toBeUndefined();
      expect(flattenedHowItWorksResponse[1].versionContent).toBeUndefined();
      expect(flattenedHowItWorksResponse[2].versionContent).toBeUndefined();
      expect(flattenedHowItWorksResponse[3].versionContent).toBeUndefined();
      expect(flattenedHowItWorksResponse[4].versionContent).toBeUndefined();
    });

    it("adds a title and a body field", () => {
      expect(flattenedHowItWorksResponse.length).toBe(5);
      expect(flattenedHowItWorksResponse[0].title).toBeDefined();
      expect(flattenedHowItWorksResponse[0].body).toBeDefined();
      expect(flattenedHowItWorksResponse[1].title).toBeDefined();
      expect(flattenedHowItWorksResponse[1].body).toBeDefined();
      expect(flattenedHowItWorksResponse[2].title).toBeDefined();
      expect(flattenedHowItWorksResponse[2].body).toBeDefined();
      expect(flattenedHowItWorksResponse[3].title).toBeDefined();
      expect(flattenedHowItWorksResponse[3].body).toBeDefined();
      expect(flattenedHowItWorksResponse[4].title).toBeDefined();
      expect(flattenedHowItWorksResponse[4].body).toBeDefined();
    });
  });
});
