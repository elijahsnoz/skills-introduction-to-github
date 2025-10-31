/**
 * Ecosystem Governance
 * Manages proposals, voting, and community governance for the digital currency
 */

class Proposal {
  constructor(id, creator, title, description, votingPeriod) {
    this.id = id;
    this.creator = creator;
    this.title = title;
    this.description = description;
    this.createdAt = Date.now();
    this.votingPeriod = votingPeriod; // in milliseconds
    this.votesFor = 0;
    this.votesAgainst = 0;
    this.voters = new Set();
    this.status = 'active'; // active, passed, rejected, expired
  }

  vote(voterAddress, inFavor, votingPower = 1) {
    if (this.status !== 'active') {
      return {
        success: false,
        error: 'Proposal is not active',
      };
    }

    if (Date.now() > this.createdAt + this.votingPeriod) {
      this.status = 'expired';
      return {
        success: false,
        error: 'Voting period has expired',
      };
    }

    if (this.voters.has(voterAddress)) {
      return {
        success: false,
        error: 'Already voted',
      };
    }

    this.voters.add(voterAddress);
    
    if (inFavor) {
      this.votesFor += votingPower;
    } else {
      this.votesAgainst += votingPower;
    }

    return {
      success: true,
      votesFor: this.votesFor,
      votesAgainst: this.votesAgainst,
    };
  }

  finalize() {
    if (this.status !== 'active') {
      return {
        success: false,
        error: 'Proposal is not active',
      };
    }

    if (Date.now() < this.createdAt + this.votingPeriod) {
      return {
        success: false,
        error: 'Voting period not finished',
      };
    }

    if (this.votesFor > this.votesAgainst) {
      this.status = 'passed';
    } else {
      this.status = 'rejected';
    }

    return {
      success: true,
      status: this.status,
      votesFor: this.votesFor,
      votesAgainst: this.votesAgainst,
    };
  }

  getInfo() {
    return {
      id: this.id,
      creator: this.creator,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt,
      votingPeriod: this.votingPeriod,
      votesFor: this.votesFor,
      votesAgainst: this.votesAgainst,
      totalVoters: this.voters.size,
      status: this.status,
    };
  }
}

class GovernanceSystem {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.proposals = new Map();
    this.minVotingPeriod = 24 * 60 * 60 * 1000; // 24 hours
  }

  createProposal(creator, title, description, votingPeriod) {
    if (votingPeriod < this.minVotingPeriod) {
      return {
        success: false,
        error: `Voting period must be at least ${this.minVotingPeriod}ms`,
      };
    }

    const id = `prop_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const proposal = new Proposal(id, creator, title, description, votingPeriod);
    this.proposals.set(id, proposal);

    return {
      success: true,
      proposalId: id,
      proposal: proposal.getInfo(),
    };
  }

  vote(proposalId, voterAddress, inFavor) {
    if (!this.proposals.has(proposalId)) {
      return {
        success: false,
        error: 'Proposal not found',
      };
    }

    const proposal = this.proposals.get(proposalId);
    
    // Voting power based on wallet balance
    const balance = this.blockchain.getBalanceOfAddress(voterAddress);
    const votingPower = Math.max(1, Math.floor(balance / 100));

    return proposal.vote(voterAddress, inFavor, votingPower);
  }

  finalizeProposal(proposalId) {
    if (!this.proposals.has(proposalId)) {
      return {
        success: false,
        error: 'Proposal not found',
      };
    }

    const proposal = this.proposals.get(proposalId);
    return proposal.finalize();
  }

  getProposal(proposalId) {
    if (!this.proposals.has(proposalId)) {
      return {
        success: false,
        error: 'Proposal not found',
      };
    }

    return {
      success: true,
      proposal: this.proposals.get(proposalId).getInfo(),
    };
  }

  listProposals(status = null) {
    const proposalList = [];
    for (const [id, proposal] of this.proposals) {
      const info = proposal.getInfo();
      if (!status || info.status === status) {
        proposalList.push(info);
      }
    }

    return {
      success: true,
      proposals: proposalList,
      count: proposalList.length,
    };
  }
}

module.exports = { Proposal, GovernanceSystem };
