import supertest from 'supertest';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import App from '../src/App';

chai.use(sinonChai);
export const { expect } = chai;
export const server = supertest.agent(App);
export const BASE_URL = '/history';