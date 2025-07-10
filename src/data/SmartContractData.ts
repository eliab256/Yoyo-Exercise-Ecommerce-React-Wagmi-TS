import { type Address } from 'viem';

interface ContractsConfig {
    [chainId: number]: {
        contractAddress: Address;
    };
}

export const chainsToContractAddress: ContractsConfig = {
    11155111: {
        //Sepolia
        contractAddress: '0xE4a70e31DA7ddcD31929E029e19993e0693363E9',
    },
};

export const contractAbi = [
    {
        inputs: [
            {
                internalType: 'address',
                name: '_owner',
                type: 'address',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [],
        name: 'AlreadyPurchased',
        type: 'error',
    },
    {
        inputs: [],
        name: 'InvalidAddress',
        type: 'error',
    },
    {
        inputs: [],
        name: 'NoFundsToWithdraw',
        type: 'error',
    },
    {
        inputs: [],
        name: 'OnlyOwnerAllowed',
        type: 'error',
    },
    {
        inputs: [],
        name: 'TransferFailed',
        type: 'error',
    },
    {
        inputs: [],
        name: 'UseBuyExerciseFunction',
        type: 'error',
    },
    {
        inputs: [],
        name: 'ValueMismatch',
        type: 'error',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'FundsWithdrawn',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'exerciseId',
                type: 'uint256',
            },
        ],
        name: 'PurchaseCompleted',
        type: 'event',
    },
    {
        stateMutability: 'payable',
        type: 'fallback',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '_amount',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: '_id',
                type: 'uint256',
            },
        ],
        name: 'buyExercise',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getBalance',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getYourIds',
        outputs: [
            {
                internalType: 'uint256[]',
                name: '',
                type: 'uint256[]',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'i_Owner',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'withdrawFunds',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        stateMutability: 'payable',
        type: 'receive',
    },
];
