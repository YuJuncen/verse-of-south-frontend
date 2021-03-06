import { DateTime } from 'luxon';
import { FormatType, DetailedPost } from './detailed-post';
import MOCK_COMMENTS from './mock-comments';
import { Post } from '../index-view/post';
export default {
    id: 0,
    title: '昼雪',
    publishTime: DateTime.local().minus({days: 3}),
    formatType: FormatType.Markdown,
    tags: [],
    intro: `山不大，用一些地理知识目测得到的高度不过海拔五百米不到。 同四周一样，大陆性气候让这座山诡谲多变。夏天树木郁郁葱葱；早可见树上滴落的露珠，午可观群鸟拍着翅膀冲上云霄，晚可听蝉鸣、赏群星。冬天的阔叶林则变得光秃秃的，仅仅留下针叶树上反射刺眼阳光的树挂和寒枝上罕见的几点梅花：视野忽地就会开阔起来，一眼能望见山头、山脚的大河以及首都那高高的城郭。`,
    content: `# prelude
- 我们要探讨什么？
*代数数据类型；或者说“Algebraic Data Types”。*
- 那是什么？
*“类型的代数系统”，将类型抽象为数值，而后研究他们定义在其上的各种运算。*
- 怎么把类型当成数呢？
*要有 0 和 1；接下来是加法，然后是乘法。*

# \`Bottom\`和\`Unit\`
- 这些东西哪来的呢？
*\`Bottom\`是 0；\`Unit\`是 1；和类型构造是加法；积类型构造是乘法。*
- 什么是\`Bottom\`？
*没有值的类型。对这个类型的表达式求值会让程序崩溃或是陷入死循环。*
*比如说，scala 中的\`???\`；Haskell 中的\`undefined\`；因为\`Bottom\`是空的，所以他可以是一切类型的子类型（因此 Haskell 的\`undefined\`的类型是\`a\`）。Haskell 和 Java 之类的会叫他\`Void\`；scala 中把它叫做\`Nothing\`。*
- \`Bottom\`有几个值？
*0。*
- 什么是\`Unit\`？
*仅有一个值的类型。某些时候我们会认为它是一个空元组。*
*比如说：*
\`\`\`rust
struct Unit {}
\`\`\`
- \`Unit\`有几个值？
*1。*

# 积类型和和类型
- 讨论积类型和和类型之前，我们先谈谈，类型是什么？
*某些在观念上具有相同性质的元素的**集合**；我是这样认为的，我觉得如果这么一想，类型就更加像是“数值”了。*
- 集合上面有哪些操作？
*交、并、笛卡尔积、排列、组合、幂集……*
- 类型上面呢？换句话问，假如说类型是不可再分的原子，哪些方法可以组合他们？
*构造结构体，构造共用体，构造函数类型……一类的。*
- 比如说，rust 中的\`enum\`或者\`struct\`，那样的？
*是的，借助他们的力量，我们可以创造**和类型**和**积类型**了；在集合上，他们体现为**并**和**笛卡尔积**。*
- 能不能写一些示例代码？
\`\`\`rust
enum Plus<A, B> {
    Left(A),
    Right(B),
}
struct Mut<A, B>(A, B)
\`\`\`
- 唔……它们似乎都是高阶类型啊……
*高阶（泛型）类型很像是类型之间的函数。接受若干个泛型参数（这些参数往往是普通的类型，或者说数学中的“数值”），返回作为结果的类型（或者说“数值”）。*
- 那样，高阶类型还算类型吗？
*不妨想想看，函数还算是数吗？*

# 类型上的代数运算（〇）
- 回头看看，我们有了加法（\`Plus<A, B>\`）、乘法（\`Mut<A, B>\`），还有 0(\`Bottom\`) 和 1(\`Unit\`)；他们可以拥有怎样的规律吗？
*单位律：x + 0 = x, x * 1 = x*
*零律：x * 0 = 0*

# 等号呢？
- 你提到了等号……我们有等号了吗？
*没有……*
- 如何比较两个**集合**的等价性？
*有的时候我们会比较集合间内容的等价性。但是另一种方法是比较集合的势。如果能够构造集合间的一一对应，那么便可以说他们等势；后者在比较代数系统（集合只是代数系统的一部分）时常常会被讨论。*
- 类型像是代数系统吗？
*非常像。*
- 如何比较两个**类型**的等价性？
*或许比较代数系统的等价性的方法会有用；就是说，讨论类的同态性比起讨论全等会更有趣一些。*

# 类型上的代数运算（一）
- 所以我们用同态来表示刚才提到的等号，那些规律能满足吗？
*\`Plus<Bottom, T>\`只能被\`Right(T)\`构造，因为不存在\`Bottom\`；所以它和\`T\`同态。*
*\`Mul<Unit, T>\`只能被\`Mul(Unit{}, T)\`构造，因为\`Unit\`没有第二个值；所以它和\`T\`同态。*
*\`Mul<Bottom, T>\`无法被构造，因为无法找到\`Bottom\`的值；所以它和\`Bottom\`同态。*
- 假如说\`T\`类型有\`t\`个值；\`R\`类型有\`r\`个值，那么\`Plus<T,R>\`有几个值？\`Mul<T,R>\`呢？
*\`Plus<T,R>\`有\`t + r\`个值，因为它可能是\`T\`中的任意一个；也可以是\`R\`中间的任意一个；但不管怎么样，它只能是一个；有点像是组合数学中的加法原理。*
*\`Mul<T,R>\`有\`t * r\`个值，因为它可以从\`T\`中任意选择一个；然后可以从\`R\`中任意选择一个；第一次有\`t\`种选法，第二次有\`r\`种选法；有点像是组合数学中的乘法原理。*

- 好！接下来呢？
*我们很可能还可以试着证明这是一个环，但是暂时没有这个必要。因为还有更重要的事吧。*
- 是的，接下来我们讨论函数。函数类型怎么表示呢？`,
    comments: MOCK_COMMENTS,
} as DetailedPost;
