const showTransactionAdditionPanelBtn = document.querySelector('.add-transaction') as HTMLButtonElement;
const deleteAllBtn = document.querySelector('.delete-all') as HTMLButtonElement;
const saveTransactionAdditionBtn = document.querySelector('.save') as HTMLButtonElement;
const cancelTransactionAdditionBtn = document.querySelector('.cancel') as HTMLButtonElement;

const transactionName = document.querySelector('#name') as HTMLInputElement;
const transactionAmount = document.querySelector('#amount') as HTMLInputElement;
const transactionCategory = document.querySelector('#category') as HTMLSelectElement;

const income = document.querySelector('.income-area') as HTMLDivElement;
const expenses = document.querySelector('.expenses-area') as HTMLDivElement;
const addTransactionPanel = document.querySelector('.add-transaction-panel') as HTMLDivElement;
const availableMoney = document.querySelector('.available-money') as HTMLDivElement;

let positiveMoney: number[] = [],
	negativeMoney: number[] = [];

const addTransaction = (): void => {
	const numberRE = /^[+-]?\d+(\.\d+)?$/;

	if (transactionName.value !== '' && transactionAmount.value !== '' && transactionAmount.value.match(numberRE)) {
		const transactionDiv: HTMLDivElement = document.createElement('div');
		const transactionNameP: HTMLParagraphElement = document.createElement('p');
		const transactionNameSpan: HTMLSpanElement = document.createElement('span');
		const transactionAmountP: HTMLParagraphElement = document.createElement('p');

		const transactionIcon: HTMLElement = document.createElement('i');
		const transactionDeleteButton: HTMLButtonElement = document.createElement('button');
		const transactionDeleteButtonIcon: HTMLElement = document.createElement('i');

		const selectedCategoryIndex: number = transactionCategory.options.selectedIndex;

		let amountPrefix: string;

		if (selectedCategoryIndex === 1) {
			transactionIcon.classList.add('fas', 'fa-money-bill-wave');

			transactionNameP.append(transactionIcon);
			income.append(transactionDiv);

			amountPrefix = '+';

			positiveMoney.push(Number(transactionAmount.value));
		} else {
			amountPrefix = '-';
			negativeMoney.push(Number(transactionAmount.value));

			switch (selectedCategoryIndex) {
				case 2:
					transactionIcon.classList.add('fas', 'fa-cart-arrow-down');
					transactionNameP.append(transactionIcon);
					break;

				case 3:
					transactionIcon.classList.add('fas', 'fa-hamburger');
					transactionNameP.append(transactionIcon);
					break;

				case 4:
					transactionIcon.classList.add('fas', 'fa-film');
					transactionNameP.append(transactionIcon);
					break;
			}
			expenses.append(transactionDiv);
		}

		transactionNameSpan.textContent = transactionName.value;
		transactionAmountP.textContent = `${amountPrefix}${transactionAmount.value}zł`;

		transactionDeleteButton.classList.add('delete');
		transactionDeleteButtonIcon.classList.add('fas', 'fa-times');
		transactionDeleteButton.append(transactionDeleteButtonIcon);
		transactionAmountP.append(transactionDeleteButton);

		transactionNameP.classList.add('transaction-name');
		transactionAmountP.classList.add('transaction-amount');
		transactionDiv.classList.add('transaction');
		transactionDiv.addEventListener('click', deleteRecord);

		transactionNameP.append(transactionNameSpan);
		transactionDiv.append(transactionNameP);
		transactionDiv.append(transactionAmountP);

		closePanel();
		// clearInputs();
		calculateAvailableMoneyAmount();
	}
};

const cancelTransactionAddition = (): void => {
	closePanel();
	clearInputs();
};

const deleteRecord = (e: Event): void => {
	const target = e.target as HTMLElement;

	if (target.classList.contains('delete') || target.classList.contains('fas')) {
		const transactionDiv = e.currentTarget as HTMLDivElement;

		transactionDiv.remove();
	
		calculateAvailableMoneyAmount();
	}
};

const deleteAllRecords = (): void => {
	const transactions = document.querySelectorAll('.transaction');

	transactions.forEach(transaction => {
		transaction.remove();
	});

	calculateAvailableMoneyAmount();
};

const clearInputs = (): void => {
	transactionName.value = '';
	transactionAmount.value = '';
	transactionCategory.selectedIndex = 1;
};

const showPanel = (): void => {
	addTransactionPanel.classList.remove('add-transaction-panel--hidden');
};

const closePanel = (): void => {
	addTransactionPanel.classList.add('add-transaction-panel--hidden');
};

const calculateAvailableMoneyAmount = () => {
	let availableMoneyAmount: number = 0;

	positiveMoney.forEach(amount => (availableMoneyAmount += amount));

	negativeMoney.forEach(amount => (availableMoneyAmount -= amount));

	availableMoney.textContent = availableMoneyAmount.toFixed(2).toString();
};

showTransactionAdditionPanelBtn.addEventListener('click', showPanel);
saveTransactionAdditionBtn.addEventListener('click', addTransaction);
deleteAllBtn.addEventListener('click', deleteAllRecords);
cancelTransactionAdditionBtn.addEventListener('click', cancelTransactionAddition);
