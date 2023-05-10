// Frontend

// Import the necessary libraries
import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";

// Create a new form
const LoanApplicationForm = () => {
    // State variables
    const [name, setName] = useState("");
    const [yearEstablished, setYearEstablished] = useState("");
    const [loanAmount, setLoanAmount] = useState("");
    const [accountingProvider, setAccountingProvider] = useState("");
    const [balanceSheet, setBalanceSheet] = useState([]);
    const [preAssessment, setPreAssessment] = useState(20);

    // Use the useForm hook to create a form
    const {register, handleSubmit} = useForm();

    // Fetch the balance sheet from the accounting provider
    useEffect(() => {
        fetch(`https://api.accountingprovider.com/balance-sheets/${accountingProvider}/${name}`)
            .then(response => response.json())
            .then(balanceSheet => {
                setBalanceSheet(balanceSheet);
            });
    }, [accountingProvider, name]);

    // Apply the rules to the balance sheet
    useEffect(() => {
        const hasProfit = balanceSheet.some(row => row.profitOrLoss > 0);
        const averageAssetValue = balanceSheet.reduce((total, row) => {
            return total + row.assetsValue;
        }, 0) / balanceSheet.length;

        if (hasProfit) {
            setPreAssessment(60);
        } else if (averageAssetValue > loanAmount) {
            setPreAssessment(100);
        }
    }, [balanceSheet, loanAmount]);

    // Submit the form
    const handleSubmit = (event) => {
        event.preventDefault();

        // Send the preAssessment value to the backend
        fetch("/api/loan-applications", {
            method: "POST", body: JSON.stringify({
                preAssessment: preAssessment
            })
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
            });
    };

    // Render the form
    return (<form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="yearEstablished">Year Established</label>
                <input id="yearEstablished" type="number" value={yearEstablished}
                       onChange={(e) => setYearEstablished(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="loanAmount">Loan Amount</label>
                <input id="loanAmount" type="number" value={loanAmount}
                       onChange={(e) => setLoanAmount(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="accountingProvider">Accounting Provider</label>
                <select id="accountingProvider" value={accountingProvider}
                        onChange={(e) => setAccountingProvider(e.target.value)}>
                    <option value="Xero">Xero</option>
                    <option value="MYOB">MYOB</option>
                </select>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>);
};

// Export the component
export default LoanApplicationForm;
