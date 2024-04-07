import mongoose, {Schema, Document, Model} from 'mongoose';

export interface IContent extends Document {
    cid: string;
    title?: string;
    content: string;
    passwordHash?: string;
};

const contentSchema = new Schema<IContent>({
    title: {type: String, required: false},
    content: {type: String, required: true},
    cid: {type: String, required: true, unique: true},
    passwordHash: {type: String, required: false}
}, {
    timestamps: true,
});

const ContentModel: Model<IContent> = mongoose.models.Content || mongoose.model<IContent>('Content', contentSchema);

export default ContentModel;

