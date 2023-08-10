import { Request, Response, NextFunction } from 'express';
import UserUsesCases from '../../2.ABR/userUseCase';
import HttpError from '../../4.F&D/models/HttpErrors';
import { userResponseType } from '../../1.EBR/UserDTO';
import { Chat } from '@prisma/client';

export default class UserController {
  constructor(private userUseCase: UserUsesCases) {}
  // fetchUserById = async (
  //   { params }: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   const { uid } = params;
  //   let user;
  //   try {
  //     user = await this.userUseCase.findUserById(uid);
  //   } catch (err) {
  //     const error = new HttpError('Creating contact failed, try again', 500);
  //     return next(error);
  //   }
  //   return res.status(200).json(user);
  // };

  postNewUser = async (req: Request, res: Response, next: NextFunction) => {
    let newUser: userResponseType;
    try {
      newUser = await this.userUseCase.addNewUser(req.body);
    } catch (err) {
      const error = new HttpError('Creating new user failed, try again', 500);
      return next(error);
    }
    return res.status(201).json(newUser);
  };

  fetchChats = async (req: Request, res: Response, next: NextFunction) => {
    const { uid } = req.body;
    let chats: Chat[] | [];
    try {
      chats = await this.userUseCase.getAllChats(uid);
    } catch (err) {
      const error = new HttpError('Creating new user failed, try again', 500);
      return next(error);
    }
    return res.status(201).json(chats);
  };

  fetchAllContacts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { uid } = req.body;
    let users;
    try {
      users = await this.userUseCase.getAllContacts(uid);
    } catch (err) {
      const error = new HttpError('Error fetching all user', 500);
      return next(error);
    }
    return res.status(200).json({ users });
  };

  postNewContact = async (req: Request, res: Response, next: NextFunction) => {
    const { uid, alias, email } = req.body;
    let response;
    try {
      response = await this.userUseCase.addNewContact(uid, alias, email);
    } catch (err) {
      const error = new HttpError('Creating contact failed, try again', 500);
      return next(error);
    }
    return res.status(201).json(response);
  };

  postNewChat = async (req: Request, res: Response, next: NextFunction) => {
    const { alias, members } = req.body;
    let newChat;
    try {
      if (members.length > 2 && alias === undefined) {
        throw Error('Should add name for the group');
      }
      newChat = await this.userUseCase.createNewChat(alias, members);
    } catch (err) {
      const error = new HttpError('Creating new chat failed, try again', 500);
      return next(err);
    }
    return res.status(201).json(newChat);
  };

  postNewMsg = async (req: Request, res: Response, next: NextFunction) => {
    const { chatId, content, type, senderId } = req.body;
    let msg;
    try {
      msg = await this.userUseCase.sendMsg(chatId, content, type, senderId);
    } catch (err) {
      const error = new HttpError('Sending message failed, try again', 500);
      return next(error);
    }
    return res.status(201).json(msg);
  };
  fetchChatMsgs = async (req: Request, res: Response, next: NextFunction) => {
    const { uid, chatId } = req.body;
    let msgs;
    try {
      msgs = await this.userUseCase.getAllChatMsgs(uid, chatId);
    } catch (err) {
      const error = new HttpError('Fetch messages failed, try again', 500);
      return next(error);
    }
    return res.status(200).json(msgs);
  };
}
