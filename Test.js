import React from "react";
import {render, screen} from "@testing-library/react";
import LoanApplicationForm from "./LoanApplicationForm";

describe("LoanApplicationForm", () => {
    it("renders the form", () => {
        const {getByTestId} = render(<LoanApplicationForm/>);

        expect(getByTestId("name")).toBeInTheDocument();
        expect(getByTestId("yearEstablished")).toBeInTheDocument();
        expect(getByTestId("loanAmount")).toBeInTheDocument();
        expect(getByTestId("accountingProvider")).toBeInTheDocument();
        expect(getByTestId("submit")).toBeInTheDocument();
    });
});
